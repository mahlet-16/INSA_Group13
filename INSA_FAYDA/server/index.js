const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// JWT auth helpers
const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret_change_me';
let authenticateToken = (req, res, next) => next();
let requireRole = () => (req, res, next) => next();
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}
// Assign real implementations (kept before routes)
authenticateToken = function (req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
requireRole = function (role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};

// Fallbacks no longer needed

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change if your MAMP/MySQL user is different
  password: 'root', // Change if your MAMP/MySQL password is different
  database: 'central_registry',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Set up multer for logo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Ensure super_admins table exists and seed a default account if empty
db.query(
  `CREATE TABLE IF NOT EXISTS super_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(120),
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(30) DEFAULT 'SuperAdmin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) {
      console.error('Error creating super_admins table:', err);
      return;
    }
    db.query('SELECT COUNT(*) AS cnt FROM super_admins', async (e2, rows) => {
      if (e2) return;
      const count = rows?.[0]?.cnt || 0;
      if (count === 0) {
        try {
          const defaultHash = await bcrypt.hash('admin123', 10);
          db.query(
            'INSERT INTO super_admins (username, email, password_hash, role) VALUES (?, ?, ?, ?) ',
            ['superadmin', 'superadmin@example.com', defaultHash, 'SuperAdmin']
          );
          console.log('Seeded default super admin (username: superadmin, password: admin123)');
        } catch (seedErr) {
          console.error('Error seeding default super admin:', seedErr);
        }
      }
    });
  }
);

// Ensure companies table exists (used across many endpoints)
db.query(
  `CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    gmail VARCHAR(120) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    company_logo VARCHAR(255),
    category VARCHAR(60),
    password_hash VARCHAR(255) NOT NULL,
    db_name VARCHAR(120) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_companies_username (username),
    UNIQUE KEY uq_companies_gmail (gmail)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  (err) => {
    if (err) {
      console.error('Error creating companies table:', err);
    }
  }
);

// Test route
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Check username availability
app.get('/check-username/:username', (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  
  db.query('SELECT id FROM companies WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ available: results.length === 0 });
  });
});

// Check email availability
app.get('/check-email/:email', (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  db.query('SELECT id FROM companies WHERE gmail = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ available: results.length === 0 });
  });
});

// Update /registerCompany to create a new DB and users table
app.post('/registerCompany', upload.single('company_logo'), async (req, res) => {
  try {
    const { username, phone, address, gmail, company_name, category, password } = req.body;
    const company_logo = req.file ? req.file.filename : null;
    if (!username || !gmail || !company_name || !password) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    // Generate DB name
    const dbName = company_name.replace(/\s+/g, '_').toLowerCase() + '_db';
    // 1. Create the company database
    db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
      if (err) {
        console.error('Error creating company DB:', err);
        return res.status(500).json({ message: 'Error creating company DB.' });
      }
      // 2. Create the users table in the new DB
      const userTableSQL = `
        CREATE TABLE IF NOT EXISTS \`${dbName}\`.users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          full_name VARCHAR(100),
          email VARCHAR(100),
          phone VARCHAR(20),
          user_type VARCHAR(50),
          image VARCHAR(255),
          status ENUM('Active','Inactive'),
          fayda_id VARCHAR(50),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;
      db.query(userTableSQL, (err2) => {
        if (err2) {
          console.error('Error creating users table:', err2);
          return res.status(500).json({ message: 'Error creating users table.' });
        }
        // 3. Insert company into central_registry with db_name
        db.query(
          'INSERT INTO companies (username, phone, address, gmail, company_name, company_logo, category, password_hash, db_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [username, phone, address, gmail, company_name, company_logo, category, password_hash, dbName],
          (err3, result) => {
            if (err3) {
              console.error('Error inserting company:', err3);
              
              // Handle duplicate entry errors
              if (err3.code === 'ER_DUP_ENTRY') {
                if (err3.message.includes('uq_companies_gmail')) {
                  return res.status(400).json({ message: 'This email address is already registered. Please use a different email.' });
                } else if (err3.message.includes('uq_companies_username')) {
                  return res.status(400).json({ message: 'This username is already taken. Please choose a different username.' });
                } else {
                  return res.status(400).json({ message: 'A company with these details already exists.' });
                }
              }
              
              return res.status(500).json({ message: 'Database error. Please try again.' });
            }
            res.json({ message: 'You have successfully registered!' });
          }
        );
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login endpoint (Company Admin)
app.post('/login', (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ message: 'Missing credentials.' });
  }
  db.query(
    'SELECT * FROM companies WHERE username = ? OR gmail = ?',
    [user, user],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      if (!results.length) return res.status(401).json({ message: 'Invalid credentials' });
      const company = results[0];
      const match = await bcrypt.compare(password, company.password_hash);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
      const token = generateToken({ role: 'CompanyAdmin', companyId: company.id });
      res.json({ 
        message: 'Login successful', 
        token, 
        company: { 
          id: company.id, 
          company_name: company.company_name, 
          company_logo: company.company_logo,
          category: company.category,
          role: 'CompanyAdmin' 
        } 
      });
    }
  );
});

// Super Admin login
app.post('/admin/login', (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) return res.status(400).json({ message: 'Missing credentials.' });
  db.query('SELECT * FROM super_admins WHERE username = ? OR email = ?', [user, user], async (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
    const admin = rows[0];
    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken({ role: 'SuperAdmin', adminId: admin.id });
    res.json({ message: 'Login successful', token, admin: { id: admin.id, username: admin.username, role: 'SuperAdmin' } });
  });
});

// Update /registerUser to use company-specific DB and log errors
app.post('/registerUser', upload.single('image'), (req, res) => {
  const { company_id, full_name, email, phone, status, fayda_id, user_type } = req.body;
  const image = req.file ? req.file.filename : null;
  if (!company_id || !full_name || !email || !status || !fayda_id || !user_type) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  // Get company DB name
  db.query('SELECT db_name FROM companies WHERE id = ?', [company_id], (err, results) => {
    if (err || !results.length) {
      console.error('Error fetching company DB name:', err);
      return res.status(500).json({ message: 'Company DB not found.' });
    }
    const dbName = results[0].db_name;
    // Insert user into company-specific DB
    const insertSQL = `INSERT INTO \`${dbName}\`.users (full_name, email, phone, user_type, image, status, fayda_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      insertSQL,
      [full_name, email, phone, user_type, image, status, fayda_id],
      (err2, result) => {
        if (err2) {
          console.error('Error inserting user:', err2);
          return res.status(500).json({ message: 'Database error.', error: err2.sqlMessage } );
        }
        res.json({ message: 'User successfully registered!' });
      }
    );
  });
});

// List all users for a company (multi-db)
app.get('/listUsers', (req, res) => {
  const { company_id } = req.query;
  if (!company_id) return res.status(400).json({ message: 'Missing company_id.' });
  db.query('SELECT db_name FROM companies WHERE id = ?', [company_id], (err, results) => {
    if (err || !results.length) {
      console.error('Error fetching company DB name:', err);
      return res.status(500).json({ message: 'Company DB not found.' });
    }
    const dbName = results[0].db_name;
    db.query(`SELECT * FROM \`${dbName}\`.users`, (err2, users) => {
      if (err2) {
        console.error('Error fetching users:', err2);
        return res.status(500).json({ message: 'Database error.' });
      }
      res.json(users);
    });
  });
});

// Update a user in company DB
app.put('/updateUser', (req, res) => {
  const { company_id, id, full_name, email, phone, user_type, status, fayda_id } = req.body;
  if (!company_id || !id) return res.status(400).json({ message: 'Missing required fields.' });
  db.query('SELECT db_name FROM companies WHERE id = ?', [company_id], (err, results) => {
    if (err || !results.length) return res.status(500).json({ message: 'Company DB not found.' });
    const dbName = results[0].db_name;
    const sql = `UPDATE \`${dbName}\`.users SET full_name=?, email=?, phone=?, user_type=?, status=?, fayda_id=? WHERE id=?`;
    db.query(sql, [full_name, email, phone, user_type, status, fayda_id, id], (err2) => {
      if (err2) return res.status(500).json({ message: 'Database error.' });
      res.json({ message: 'User updated.' });
    });
  });
});

// Delete a user in company DB
app.delete('/deleteUser', (req, res) => {
  const { company_id, id } = req.query;
  if (!company_id || !id) return res.status(400).json({ message: 'Missing required fields.' });
  db.query('SELECT db_name FROM companies WHERE id = ?', [company_id], (err, results) => {
    if (err || !results.length) return res.status(500).json({ message: 'Company DB not found.' });
    const dbName = results[0].db_name;
    db.query(`DELETE FROM \`${dbName}\`.users WHERE id=?`, [id], (err2) => {
      if (err2) return res.status(500).json({ message: 'Database error.' });
      res.json({ message: 'User deleted.' });
    });
  });
});

// Identity check in internal DB
app.post('/checkUser', (req, res) => {
  const { company_id, full_name, fayda_id } = req.body;
  if (!company_id && !full_name && !fayda_id) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  // 1. Get company DB name
  db.query('SELECT db_name FROM companies WHERE id = ?', [company_id], (err, results) => {
    if (err || !results.length) {
      return res.status(500).json({ message: 'Company DB not found.' });
    }
    const dbName = results[0].db_name;
    // Helper: normalize string for case-insensitive compare
    const normalize = s => (s || '').toLowerCase();
    // 2. Internal DB search logic
    let query = `SELECT * FROM \`${dbName}\`.users`;
    let params = [];
    if (full_name && fayda_id) {
      query += ' WHERE full_name = ? AND fayda_id = ?';
      params = [full_name, fayda_id];
    } else if (full_name) {
      query += ' WHERE full_name = ?';
      params = [full_name];
    } else if (fayda_id) {
      query += ' WHERE fayda_id = ?';
      params = [fayda_id];
    } else {
      return res.status(400).json({ message: 'No search criteria provided.' });
    }
    db.query(query, params, (err2, users) => {
      if (err2) return res.status(500).json({ message: 'Database error.' });
      // If both fields are entered, must match a single user
      if (full_name && fayda_id) {
        if (users.length === 1) {
          return res.json({ found: true, user: users[0], source: 'internal' });
        }
        // If not found, check mock
      } else if (full_name && !fayda_id) {
        if (users.length === 1) {
          return res.json({ found: true, user: users[0], source: 'internal' });
        } else if (users.length > 1) {
          return res.json({ multiple: true, message: 'Multiple users found with this name. Please enter Fayda ID to narrow the search.' });
        }
        // If not found, check mock
      } else if (!full_name && fayda_id) {
        if (users.length === 1) {
          return res.json({ found: true, user: users[0], source: 'internal' });
        }
        // If not found, check mock
      }
      // 3. Check mock Fayda ID DB
      const fs = require('fs');
      const path = require('path');
      fs.readFile(path.join(__dirname, 'mock_fayda_data.json'), 'utf8', (err3, data) => {
        if (err3) return res.status(500).json({ message: 'Error reading mock Fayda DB.' });
        let mockData = [];
        try {
          mockData = JSON.parse(data);
        } catch (parseErr) {
          return res.status(500).json({ message: 'Error parsing mock Fayda DB.' });
        }
        let found;
        if (full_name && fayda_id) {
          found = mockData.find(
            (u) => normalize(u.FullName) === normalize(full_name) && u.FAYDA_ID === fayda_id
          );
          if (found) {
            return res.json({ found: true, user: found, guest: true, source: 'mock' });
          }
        } else if (full_name) {
          const matches = mockData.filter(u => normalize(u.FullName) === normalize(full_name));
          if (matches.length === 1) {
            return res.json({ found: true, user: matches[0], guest: true, source: 'mock' });
          } else if (matches.length > 1) {
            return res.json({ multiple: true, message: 'Multiple users found with this name. Please enter Fayda ID to narrow the search.' });
          }
        } else if (fayda_id) {
          found = mockData.find(u => u.FAYDA_ID === fayda_id);
          if (found) {
            return res.json({ found: true, user: found, guest: true, source: 'mock' });
          }
        }
        // Not found in either
        return res.json({ found: false, message: 'This user is not found.' });
      });
    });
  });
});

// Mock Fayda DB (static JSON)
const faydaDB = [
  {
    faydaID: 'FD123456',
    fullName: 'Amina Yusuf',
    phone: '0912345678',
    email: 'amina@example.com',
    status: 'Active',
  },
  // Add more mock entries as needed
];

app.post('/checkFayda', (req, res) => {
  const { full_name, fayda_id } = req.body;
  const found = faydaDB.find(
    (u) => u.faydaID === fayda_id && u.fullName.toLowerCase() === full_name.toLowerCase()
  );
  if (found) {
    res.json({ found: true, user: found, guest: true });
  } else {
    res.json({ found: false });
  }
});

// Endpoint to serve mock FAYDA_ID data
app.get('/mockFaydaData', (req, res) => {
  fs.readFile(path.join(__dirname, 'mock_fayda_data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load mock data.' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      res.status(500).json({ message: 'Error parsing mock data.' });
    }
  });
});

// In-memory activity log (for demo; use DB in production)
const activityLog = [];
function logActivity(type, details) {
  activityLog.unshift({ type, details, timestamp: new Date().toISOString() });
  if (activityLog.length > 50) activityLog.pop();
}

// Super Admin: List all companies
app.get('/admin/companies', authenticateToken, requireRole('SuperAdmin'), (req, res) => {
  db.query('SELECT id, username, phone, address, gmail, company_name, company_logo, category, db_name FROM companies', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    res.json(results);
  });
});

// Super Admin: Update company info
app.put('/admin/company/:id', authenticateToken, requireRole('SuperAdmin'), (req, res) => {
  const { id } = req.params;
  const { username, phone, address, gmail, company_name, category } = req.body;
  db.query(
    'UPDATE companies SET username=?, phone=?, address=?, gmail=?, company_name=?, category=? WHERE id=?',
    [username, phone, address, gmail, company_name, category, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      logActivity('update', { id, username, company_name });
      res.json({ message: 'Company updated.' });
    }
  );
});

// Super Admin: Delete company
app.delete('/admin/company/:id', authenticateToken, requireRole('SuperAdmin'), (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM companies WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    logActivity('delete', { id });
    res.json({ message: 'Company deleted.' });
  });
});

// Super Admin: Reset company password
app.post('/admin/company/:id/reset-password', authenticateToken, requireRole('SuperAdmin'), async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ message: 'New password required.' });
  const bcrypt = require('bcrypt');
  const password_hash = await bcrypt.hash(newPassword, 10);
  db.query('UPDATE companies SET password_hash=? WHERE id=?', [password_hash, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    logActivity('reset-password', { id });
    res.json({ message: 'Password reset.' });
  });
});

// Super Admin: Register company (log activity)
app.post('/registerCompany', upload.single('company_logo'), async (req, res) => {
  try {
    const { username, phone, address, gmail, company_name, category, password } = req.body;
    const company_logo = req.file ? req.file.filename : null;
    if (!username || !gmail || !company_name || !password) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    // Generate DB name
    const dbName = company_name.replace(/\s+/g, '_').toLowerCase() + '_db';
    // 1. Create the company database
    db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
      if (err) {
        console.error('Error creating company DB:', err);
        return res.status(500).json({ message: 'Error creating company DB.' });
      }
      // 2. Create the users table in the new DB
      const userTableSQL = `
        CREATE TABLE IF NOT EXISTS \`${dbName}\`.users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          full_name VARCHAR(100),
          email VARCHAR(100),
          phone VARCHAR(20),
          user_type VARCHAR(50),
          image VARCHAR(255),
          status ENUM('Active','Inactive'),
          fayda_id VARCHAR(50),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;
      db.query(userTableSQL, (err2) => {
        if (err2) {
          console.error('Error creating users table:', err2);
          return res.status(500).json({ message: 'Error creating users table.' });
        }
        // 3. Insert company into central_registry with db_name
        db.query(
          'INSERT INTO companies (username, phone, address, gmail, company_name, company_logo, category, password_hash, db_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [username, phone, address, gmail, company_name, company_logo, category, password_hash, dbName],
          (err3, result) => {
            if (err3) {
              console.error('Error inserting company:', err3);
              return res.status(500).json({ message: 'Database error.' });
            }
            logActivity('register', { username, company_name });
            res.json({ message: 'You have successfully registered!' });
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Super Admin: Get recent activity log
app.get('/admin/activity-log', authenticateToken, requireRole('SuperAdmin'), (req, res) => {
  res.json(activityLog);
});

// Company Admin profile APIs
app.get('/company/profile', (req, res) => {
  const { company_id } = req.query;
  if (!company_id) return res.status(400).json({ message: 'company_id required.' });
  db.query(
    'SELECT id, username, phone, address, gmail, company_name, company_logo, category, db_name FROM companies WHERE id=?',
    [company_id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      if (!rows.length) return res.status(404).json({ message: 'Company not found.' });
      res.json(rows[0]);
    }
  );
});

app.put('/company/profile', upload.single('company_logo'), async (req, res) => {
  const { company_id, username, phone, address, gmail, company_name, category, newPassword } = req.body;
  if (!company_id) return res.status(400).json({ message: 'company_id required.' });
  // Basic validations
  if (gmail) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail);
    if (!emailOk) return res.status(400).json({ message: 'Invalid email format.' });
  }
  if (newPassword && String(newPassword).length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }
  const updates = [];
  const params = [];
  if (username != null) { updates.push('username=?'); params.push(username); }
  if (phone != null) { updates.push('phone=?'); params.push(phone); }
  if (address != null) { updates.push('address=?'); params.push(address); }
  if (gmail != null) { updates.push('gmail=?'); params.push(gmail); }
  if (company_name != null) { updates.push('company_name=?'); params.push(company_name); }
  if (category != null) { updates.push('category=?'); params.push(category); }
  if (req.file && req.file.filename) { updates.push('company_logo=?'); params.push(req.file.filename); }
  if (newPassword) {
    try {
      const hash = await bcrypt.hash(newPassword, 10);
      updates.push('password_hash=?');
      params.push(hash);
    } catch {
      return res.status(500).json({ message: 'Failed to hash password.' });
    }
  }
  if (!updates.length) return res.status(400).json({ message: 'Nothing to update.' });
  const sql = `UPDATE companies SET ${updates.join(', ')} WHERE id=?`;
  params.push(company_id);
  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    logActivity('company-profile-update', { id: company_id, username, company_name });
    res.json({ message: 'Company profile updated.' });
  });
});

// Super Admin profile APIs
app.get('/admin/profile', authenticateToken, requireRole('SuperAdmin'), (req, res) => {
  db.query('SELECT id, username, email, avatar, role, created_at FROM super_admins ORDER BY id ASC LIMIT 1', (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!rows.length) return res.status(404).json({ message: 'No admin found.' });
    res.json(rows[0]);
  });
});

app.put('/admin/profile', authenticateToken, requireRole('SuperAdmin'), upload.single('avatar'), async (req, res) => {
  const { username, newPassword, email } = req.body;
  db.query('SELECT id FROM super_admins ORDER BY id ASC LIMIT 1', async (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!rows.length) return res.status(404).json({ message: 'No admin found.' });
    const id = rows[0].id;
    let sql = 'UPDATE super_admins SET ';
    const params = [];
    if (username) { sql += 'username=?, '; params.push(username); }
    if (email) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) return res.status(400).json({ message: 'Invalid email format.' });
      sql += 'email=?, '; params.push(email);
    }
    if (newPassword) {
      try {
        if (String(newPassword).length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' });
        const hash = await bcrypt.hash(newPassword, 10);
        sql += 'password_hash=?, ';
        params.push(hash);
      } catch (e) {
        return res.status(500).json({ message: 'Failed to hash password.' });
      }
    }
    if (req.file && req.file.filename) { sql += 'avatar=?, '; params.push(req.file.filename); }
    if (params.length === 0) return res.status(400).json({ message: 'Nothing to update.' });
    sql = sql.replace(/,\s*$/, '');
    sql += ' WHERE id=?';
    params.push(id);
    db.query(sql, params, (err2) => {
      if (err2) return res.status(500).json({ message: 'Database error.' });
      logActivity('admin-profile-update', { username });
      res.json({ message: 'Admin profile updated.' });
    });
  });
});

app.post('/admin/admins', authenticateToken, requireRole('SuperAdmin'), async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required.' });
  try {
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO super_admins (username, email, password_hash, role) VALUES (?, ?, ?, ?)', [username, email || null, hash, 'SuperAdmin'], (err) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      logActivity('admin-add', { username });
      res.json({ message: 'Admin added.' });
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to add admin.' });
  }
});

const generateRandomPassword = () => Math.random().toString(36).slice(-8);

app.post('/forgot-password', async (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ message: 'Username or email required.' });
  db.query('SELECT id FROM companies WHERE username = ? OR gmail = ?', [user, user], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!results.length) return res.status(404).json({ message: 'User not found.' });
    const id = results[0].id;
    const newPassword = generateRandomPassword();
    const bcrypt = require('bcrypt');
    const password_hash = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE companies SET password_hash=? WHERE id=?', [password_hash, id], (err2) => {
      if (err2) return res.status(500).json({ message: 'Database error.' });
      // For demo: return new password in response. In production, email it.
      res.json({ message: 'Password reset. Use the new password to log in.', newPassword });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
