# 🆔 FAYDA System - National ID Verification & Access Control Platform

## 📖 What is FAYDA?

**FAYDA System** is a unified web platform for secure identity verification in Ethiopia. It uses the Ethiopian National ID (FAYDA) as a universal digital pass, enabling organizations to verify individuals and control access securely across schools, offices, hospitals, and government facilities.

### 🎯 Mission Statement
> **"One ID, Everywhere Access"** - Verified once, used many places

## 🚀 Core Features

### 🔐 Access Control
- **ID Scanning & Verification**: Real-time FAYDA ID validation
- **Role-Based Permissions**: Different access levels for different user types
- **Time-Based Access**: Schedule-based entry permissions
- **Visitor Passes**: Temporary access for guests

### 🛡️ Security Features
- **Real-time Alerts**: Instant notifications for unauthorized access attempts
- **Full Access Logs**: Complete audit trail of all access events
- **Emergency Lockdown**: Immediate system lockdown capabilities
- **Blacklist Management**: Prevent access for unauthorized individuals

### 📊 Monitoring & Analytics
- **Dashboard Analytics**: Real-time occupancy and access statistics
- **Comprehensive Reports**: Detailed access logs and usage reports
- **User Management**: Complete user lifecycle management
- **Multi-level Portal**: Separate interfaces for Admin, Company, and Users

## 🏗️ Architecture

### Frontend (React.js)
```
client/src/
├── components/
│   ├── Header.js          # Main navigation and hero section
│   ├── Dashboard.js       # Company admin dashboard
│   ├── SuperAdmin.jsx     # Super admin interface
│   ├── LoginForm.js       # Authentication forms
│   ├── RegisterForm.js    # Company registration
│   └── pages/
│       ├── AboutPage.jsx  # About us page
│       ├── ServicePage.jsx # Services page
│       └── ContactPage.jsx # Contact page
├── sections/
│   ├── AboutSection.js    # Home page about section
│   ├── HowItWorks.js      # How it works section
│   ├── ServicesSection.js # Services showcase
│   └── Footer.js          # Site footer
└── utilities/
    ├── UserList.js        # User management
    ├── IdentityCheck.js   # ID verification
    └── CompanyProfile.jsx # Company profile management
```

### Backend (Node.js + Express)
```
server/
├── index.js              # Main server file with all endpoints
├── uploads/              # File upload directory for company logos
└── package.json          # Dependencies and scripts
```

### Database (MySQL)
```
central_registry/
├── companies             # Company registration data
├── super_admins          # Super admin accounts
└── {company_name}_db/    # Individual company databases
    └── users             # Company-specific user data
```

## 🎯 Use Cases

### 🏫 Schools
- **Students & Teachers**: Verified access during school hours
- **Visitors**: Temporary passes for parents and guests
- **Security**: Prevent unauthorized entry

### 🏢 Offices
- **Employees**: Controlled access by work schedule
- **Contractors**: Time-limited access for external workers
- **Monitoring**: Track attendance and access patterns

### 🏛️ Government Buildings
- **Citizens**: Verified access during appointments
- **Officials**: Role-based access for government employees
- **Security**: Enhanced security for sensitive facilities

### 🏥 Hospitals
- **Patients**: Verified access during visiting hours
- **Doctors & Staff**: Role-based access for medical personnel
- **Visitors**: Controlled access for family members

## 🛠️ Technology Stack

### Frontend
- **React.js**: Modern UI framework
- **CSS3**: Custom styling with responsive design
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database management
- **JWT**: JSON Web Token authentication
- **Multer**: File upload handling
- **Bcrypt**: Password hashing

### Database
- **MySQL (MAMP)**: Local development database
- **Multi-database Architecture**: Separate databases per company

### Integration
- **FAYDA API**: Ethiopian National ID verification
- **Optional Hardware**: RFID/NFC scanners for contactless access

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (MAMP/XAMPP)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd INSA_PROJECT
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Database Setup**
   - Start MySQL server (MAMP/XAMPP)
   - Create database named `central_registry`
   - Update database credentials in `server/index.js`

4. **Environment Configuration**
   ```bash
   # Server configuration
   cd server
   # Update database connection in index.js
   ```

5. **Start the application**
   ```bash
   # Start server (from server directory)
   npm start

   # Start client (from client directory)
   npm start
   ```

### Default Credentials
- **Super Admin**: `superadmin` / `admin123`
- **Company Admin**: Register new company account

## 🔧 API Endpoints

### Authentication
- `POST /login` - Company admin login
- `POST /admin/login` - Super admin login
- `POST /registerCompany` - Company registration

### User Management
- `POST /registerUser` - Register new user
- `GET /listUsers` - List company users
- `DELETE /deleteUser/:id` - Delete user

### Validation
- `GET /check-username/:username` - Check username availability
- `GET /check-email/:email` - Check email availability

## 🎨 User Interfaces

### 1. Public Pages
- **Home Page**: Landing page with hero section and features
- **About Page**: Company information and mission
- **Services Page**: Detailed service offerings
- **Contact Page**: Contact information and form

### 2. Authentication
- **Login Form**: Company and super admin login
- **Registration Form**: Company registration with validation

### 3. Admin Dashboards
- **Super Admin**: System-wide management
- **Company Admin**: Company-specific user management

## 🔮 Future Features

### 🤖 AI Chatbot
- 24/7 virtual assistant
- Handles FAQs, user support, and guidance
- Integrated with web & mobile platforms

### 💳 Payment Integration
- Telebirr, CBE Birr, Visa/MasterCard integration
- Pay for visitor passes, hospital cards, or government service fees
- Secure transactions with receipts & logs

### 🌍 Multi-Language Support
- Amharic, Afan Oromo, Tigrinya, English
- User-friendly experience for all Ethiopian citizens
- Translated dashboards, chatbot responses, and notifications

### 📡 Advanced Scanning & Hardware
- RFID/NFC technology for faster ID verification
- Smart cards, phones, or wearables for access
- Suitable for schools, offices & hospitals

## 📊 Benefits

| Benefit | Description |
|---------|-------------|
| 🔒 **Security** | Prevent unauthorized entry with verified identity |
| ⚡️ **Efficiency** | No need for extra ID cards - one FAYDA ID works everywhere |
| 🛰 **Tracking** | Monitor who accessed what, where, and when |
| 🚨 **Safety** | Real-time alerts for blacklisted/unauthorized users |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@faydasystem.com
- Phone: +251 XXX XXX XXX
- Website: https://faydasystem.com

---

**Built with ❤️ for Ethiopia's Digital Transformation**
