# 🔧 FAYDA System Technical Documentation

## Development Environment Setup

### Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MySQL**: v8.0 or higher (MAMP/XAMPP)
- **Git**: For version control

### Environment Variables

Create `.env` files for both client and server:

#### Server Environment (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=central_registry

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=8h

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

#### Client Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Database Schema

### Central Registry Database

```sql
-- Companies Table
CREATE TABLE companies (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Super Admins Table
CREATE TABLE super_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(120),
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(30) DEFAULT 'SuperAdmin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Company-Specific Database

```sql
-- Users Table (per company)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    user_type VARCHAR(50),
    image VARCHAR(255),
    status ENUM('Active','Inactive'),
    fayda_id VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## API Documentation

### Authentication Endpoints

#### Company Admin Login
```http
POST /login
Content-Type: application/json

{
    "user": "username_or_email",
    "password": "password"
}

Response:
{
    "message": "Login successful",
    "token": "jwt_token_here",
    "company": {
        "id": 1,
        "company_name": "Company Name",
        "company_logo": "logo_filename.png",
        "category": "Education",
        "role": "CompanyAdmin"
    }
}
```

#### Super Admin Login
```http
POST /admin/login
Content-Type: application/json

{
    "user": "username_or_email",
    "password": "password"
}

Response:
{
    "message": "Login successful",
    "token": "jwt_token_here",
    "admin": {
        "id": 1,
        "username": "superadmin",
        "role": "SuperAdmin"
    }
}
```

#### Company Registration
```http
POST /registerCompany
Content-Type: multipart/form-data

Form Data:
- username: string
- phone: string
- address: string
- gmail: string
- company_name: string
- category: string
- password: string
- company_logo: file (optional)

Response:
{
    "message": "You have successfully registered!"
}
```

### User Management Endpoints

#### Register User
```http
POST /registerUser
Content-Type: multipart/form-data

Form Data:
- company_id: number
- full_name: string
- email: string
- phone: string
- status: "Active" | "Inactive"
- fayda_id: string
- user_type: string
- image: file (optional)

Response:
{
    "message": "User successfully registered!"
}
```

#### List Users
```http
GET /listUsers?company_id={company_id}

Response:
[
    {
        "id": 1,
        "full_name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "user_type": "Employee",
        "image": "user_image.jpg",
        "status": "Active",
        "fayda_id": "123456789",
        "created_at": "2024-01-01T00:00:00.000Z"
    }
]
```

#### Delete User
```http
DELETE /deleteUser/{user_id}

Response:
{
    "message": "User deleted successfully"
}
```

### Validation Endpoints

#### Check Username Availability
```http
GET /check-username/{username}

Response:
{
    "available": true
}
```

#### Check Email Availability
```http
GET /check-email/{email}

Response:
{
    "available": true
}
```

## Frontend Components

### Core Components

#### Header Component
```javascript
// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const [activeTab, setActiveTab] = useState("home");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Dynamic header background based on scroll
    const getHeaderBackground = () => {
        if (isScrolled) return '#192436';
        if (location.pathname === '/') return 'transparent';
        return 'transparent';
    };
    
    return (
        <header className="site-header" style={{ background: getHeaderBackground() }}>
            {/* Navigation content */}
        </header>
    );
}
```

#### Dashboard Component
```javascript
// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [tab, setTab] = useState('register');
    const [userCount, setUserCount] = useState(0);
    const [dashboardHeight, setDashboardHeight] = useState('80vh');
    const navigate = useNavigate();
    
    const company = JSON.parse(localStorage.getItem('company'));
    
    // Fetch user count and adjust dashboard dimensions
    const fetchUserCount = async () => {
        if (!company?.id) return;
        
        try {
            const res = await axios.get('http://localhost:5000/listUsers', { 
                params: { company_id: company.id } 
            });
            const count = res.data.length;
            setUserCount(count);
            
            // Adjust dashboard height based on user count
            if (count === 0) setDashboardHeight('80vh');
            else if (count <= 3) setDashboardHeight('85vh');
            else if (count <= 6) setDashboardHeight('90vh');
            else if (count <= 10) setDashboardHeight('95vh');
            else setDashboardHeight('100vh');
        } catch (error) {
            console.error('Failed to fetch user count:', error);
        }
    };
    
    return (
        <div className="dashboard" style={{ minHeight: dashboardHeight }}>
            {/* Dashboard content */}
        </div>
    );
}
```

### Form Components

#### Registration Form with Validation
```javascript
// RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [form, setForm] = useState({
        username: '', phone: '', company_name: '', 
        gmail: '', password: '', confirmPassword: '', category: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [isChecking, setIsChecking] = useState({ username: false, email: false });
    
    // Real-time validation
    const checkUsernameAvailability = async (username) => {
        if (!username || username.length < 3) return;
        
        setIsChecking(prev => ({ ...prev, username: true }));
        try {
            const response = await axios.get(`http://localhost:5000/check-username/${username}`);
            if (response.data.available === false) {
                setValidationErrors(prev => ({ ...prev, username: 'This username is already taken' }));
            } else {
                setValidationErrors(prev => ({ ...prev, username: '' }));
            }
        } catch (error) {
            console.error('Error checking username:', error);
        } finally {
            setIsChecking(prev => ({ ...prev, username: false }));
        }
    };
    
    return (
        <form className="register-form" onSubmit={handleSubmit}>
            {/* Form fields with validation */}
        </form>
    );
}
```

## Styling Guidelines

### CSS Architecture

#### Component-Specific Styles
```css
/* ComponentName.css */
.component-name {
    /* Base styles */
}

.component-name__element {
    /* Element styles */
}

.component-name--modifier {
    /* Modifier styles */
}

/* Responsive design */
@media (max-width: 768px) {
    .component-name {
        /* Mobile styles */
    }
}
```

#### Color Palette
```css
:root {
    /* Primary Colors */
    --primary-blue: #2A9FD8;
    --primary-dark: #1e8bc3;
    --primary-light: #47F8DF;
    
    /* Secondary Colors */
    --secondary-dark: #192436;
    --secondary-gray: #2C5B72;
    
    /* Background Colors */
    --bg-dark: rgba(30, 30, 30, 0.95);
    --bg-light: rgba(40, 40, 40, 0.9);
    
    /* Text Colors */
    --text-white: #fff;
    --text-gray: rgba(255, 255, 255, 0.7);
    --text-dark: #03182B;
    
    /* Status Colors */
    --success: #28a745;
    --error: #ff6b6b;
    --warning: #ffc107;
}
```

#### Responsive Breakpoints
```css
/* Mobile First Approach */
/* Base styles for mobile */

/* Tablet */
@media (min-width: 768px) {
    /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
    /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1200px) {
    /* Large desktop styles */
}
```

## Security Implementation

### Authentication Security

#### JWT Token Implementation
```javascript
// Server-side JWT generation
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
};

// Client-side token storage
localStorage.setItem('company', JSON.stringify(companyData));
localStorage.setItem('company_token', token);

// Token validation middleware
const authenticateToken = (req, res, next) => {
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
```

#### Password Security
```javascript
// Password hashing with bcrypt
const password_hash = await bcrypt.hash(password, 10);

// Password verification
const match = await bcrypt.compare(password, company.password_hash);
```

### Input Validation

#### Server-Side Validation
```javascript
// Registration validation
if (!username || !gmail || !company_name || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
}

// Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(gmail)) {
    return res.status(400).json({ message: 'Invalid email format.' });
}
```

#### Client-Side Validation
```javascript
// Real-time validation
const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
        setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Check for duplicates
    if (name === 'username' && value.length >= 3) {
        checkUsernameAvailability(value);
    }
};
```

## Error Handling

### Client-Side Error Handling
```javascript
// API error handling
try {
    const res = await axios.post('http://localhost:5000/registerCompany', data);
    setMessage(res.data.message);
} catch (err) {
    setMessage(err.response?.data?.message || 'Registration failed.');
}

// Form validation errors
if (Object.values(validationErrors).some(error => error)) {
    setMessage('Please fix the validation errors before submitting.');
    return;
}
```

### Server-Side Error Handling
```javascript
// Database error handling
db.query(sql, params, (err, result) => {
    if (err) {
        console.error('Database error:', err);
        
        // Handle specific error types
        if (err.code === 'ER_DUP_ENTRY') {
            if (err.message.includes('uq_companies_gmail')) {
                return res.status(400).json({ 
                    message: 'This email address is already registered.' 
                });
            }
        }
        
        return res.status(500).json({ message: 'Database error. Please try again.' });
    }
    
    res.json({ message: 'Success!' });
});
```

## Performance Optimization

### Frontend Optimization

#### Code Splitting
```javascript
// Lazy loading for routes
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const SuperAdmin = lazy(() => import('./SuperAdmin'));

// Suspense wrapper
<Suspense fallback={<div>Loading...</div>}>
    <Dashboard />
</Suspense>
```

#### Image Optimization
```javascript
// Image loading with error handling
<img 
    src={`http://localhost:5000/uploads/${company.company_logo}`} 
    alt={`${company.company_name} Logo`} 
    className="company-logo"
    onError={(e) => {
        console.log('Image failed to load:', e.target.src);
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    }}
/>
```

### Backend Optimization

#### Database Query Optimization
```javascript
// Indexed queries for better performance
db.query('SELECT * FROM companies WHERE username = ? OR gmail = ?', [user, user]);

// Pagination for large datasets
const limit = 10;
const offset = (page - 1) * limit;
db.query('SELECT * FROM users LIMIT ? OFFSET ?', [limit, offset]);
```

#### File Upload Optimization
```javascript
// File size and type validation
const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});
```

## Testing Strategy

### Unit Testing
```javascript
// Example test for registration validation
describe('Registration Validation', () => {
    test('should validate required fields', () => {
        const formData = {
            username: '',
            gmail: '',
            company_name: '',
            password: ''
        };
        
        const errors = validateRegistrationForm(formData);
        expect(errors.username).toBe('Username is required');
        expect(errors.gmail).toBe('Email is required');
    });
});
```

### Integration Testing
```javascript
// API endpoint testing
describe('POST /registerCompany', () => {
    test('should register a new company', async () => {
        const companyData = {
            username: 'testcompany',
            gmail: 'test@company.com',
            company_name: 'Test Company',
            password: 'password123'
        };
        
        const response = await request(app)
            .post('/registerCompany')
            .field(companyData)
            .expect(200);
            
        expect(response.body.message).toBe('You have successfully registered!');
    });
});
```

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates installed
- [ ] File upload directory permissions set
- [ ] Error logging configured
- [ ] Performance monitoring enabled

### Production Configuration
```javascript
// Production server configuration
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com']
}));

// Rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

// Compression
app.use(compression());
```

### Monitoring Setup
```javascript
// Error monitoring
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Send to monitoring service
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Send to monitoring service
});
```
