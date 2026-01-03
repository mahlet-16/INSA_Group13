# 🏗️ FAYDA System Architecture Documentation

## Overview

The FAYDA System follows a modern **3-tier architecture** with clear separation of concerns between presentation, business logic, and data layers.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (React.js)                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Public    │  │  Auth Pages │  │   Admin     │         │
│  │   Pages     │  │             │  │ Dashboards  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  API LAYER (Node.js/Express)                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Auth API   │  │  User API   │  │  File API   │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ SQL Queries
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATA LAYER (MySQL)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Central    │  │  Company    │  │   Uploads   │         │
│  │  Registry   │  │  Databases  │  │   Storage   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Structure

```
src/
├── App.js                    # Main application component
├── index.js                  # Application entry point
├── components/               # Reusable UI components
│   ├── Header.js            # Navigation and hero section
│   ├── Footer.js            # Site footer
│   ├── LoginForm.js         # Authentication forms
│   └── RegisterForm.js      # Registration forms
├── pages/                   # Page-level components
│   ├── AboutPage.jsx        # About us page
│   ├── ServicePage.jsx      # Services page
│   └── ContactPage.jsx      # Contact page
├── sections/                # Home page sections
│   ├── AboutSection.js      # About section
│   ├── HowItWorks.js        # How it works section
│   └── ServicesSection.js   # Services showcase
├── admin/                   # Admin interfaces
│   ├── Dashboard.js         # Company admin dashboard
│   ├── SuperAdmin.jsx       # Super admin interface
│   ├── UserList.js          # User management
│   ├── IdentityCheck.js     # ID verification
│   └── CompanyProfile.jsx   # Company profile
└── styles/                  # CSS files
    ├── App.css              # Global styles
    ├── Header.css           # Header styles
    └── [component].css      # Component-specific styles
```

### State Management

- **Local State**: React hooks (useState, useEffect) for component-level state
- **Global State**: localStorage for authentication tokens and user data
- **Form State**: Controlled components with validation

### Routing

- **React Router DOM**: Client-side routing
- **Protected Routes**: Authentication-based route protection
- **Dynamic Routing**: Route-based component rendering

## Backend Architecture

### Server Structure

```
server/
├── index.js                 # Main server file
├── package.json             # Dependencies
├── uploads/                 # File storage
│   └── [company_logos]/     # Company logo files
└── node_modules/            # Dependencies
```

### API Design

#### Authentication Layer
```javascript
// JWT-based authentication
const authenticateToken = (req, res, next) => {
  // Token validation logic
}

const requireRole = (role) => {
  // Role-based access control
}
```

#### Route Structure
```javascript
// Authentication routes
POST /login              // Company admin login
POST /admin/login        // Super admin login
POST /registerCompany    // Company registration

// User management routes
POST /registerUser       // Register new user
GET /listUsers          // List company users
DELETE /deleteUser/:id   // Delete user

// Validation routes
GET /check-username/:username  // Username availability
GET /check-email/:email        // Email availability
```

### Middleware Stack

1. **CORS**: Cross-origin resource sharing
2. **JSON Parser**: Request body parsing
3. **Static Files**: File serving for uploads
4. **Authentication**: JWT token validation
5. **File Upload**: Multer for file handling

## Database Architecture

### Multi-Database Design

```
central_registry (Main Database)
├── companies              # Company registration data
│   ├── id (PK)
│   ├── username
│   ├── company_name
│   ├── company_logo
│   ├── category
│   ├── password_hash
│   └── db_name           # Reference to company-specific DB
└── super_admins          # Super admin accounts
    ├── id (PK)
    ├── username
    ├── email
    └── password_hash

{company_name}_db (Company-Specific Database)
└── users                 # Company user data
    ├── id (PK)
    ├── full_name
    ├── email
    ├── phone
    ├── user_type
    ├── image
    ├── status
    ├── fayda_id
    └── created_at
```

### Database Relationships

- **One-to-Many**: One company can have many users
- **Isolated Data**: Each company has its own database
- **Central Registry**: Shared company information

### Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Stateless authentication
- **Input Validation**: Server-side validation
- **SQL Injection Prevention**: Parameterized queries

## Security Architecture

### Authentication Flow

```
1. User Login Request
   ↓
2. Credential Validation
   ↓
3. JWT Token Generation
   ↓
4. Token Storage (localStorage)
   ↓
5. Protected Route Access
   ↓
6. Token Validation (Middleware)
   ↓
7. Resource Access
```

### Authorization Levels

1. **Public Access**: Home, About, Services, Contact pages
2. **Company Admin**: User management, company profile
3. **Super Admin**: System-wide management, company oversight

### Data Protection

- **HTTPS**: Secure communication (production)
- **Input Sanitization**: XSS prevention
- **CORS Configuration**: Controlled cross-origin access
- **File Upload Security**: File type and size validation

## Scalability Considerations

### Horizontal Scaling

- **Stateless Design**: JWT tokens enable stateless authentication
- **Database Separation**: Company-specific databases allow independent scaling
- **Load Balancing**: Multiple server instances possible

### Performance Optimization

- **Database Indexing**: Optimized queries for user lookups
- **File Compression**: Optimized image uploads
- **Caching**: Client-side caching for static assets
- **Lazy Loading**: Component-based code splitting

## Deployment Architecture

### Development Environment

```
Local Development
├── React Dev Server (Port 3000)
├── Node.js Server (Port 5000)
└── MySQL Database (Port 3306)
```

### Production Environment

```
Production Deployment
├── Frontend: Static hosting (Netlify/Vercel)
├── Backend: Cloud hosting (AWS/Heroku)
├── Database: Cloud database (AWS RDS)
└── File Storage: Cloud storage (AWS S3)
```

## Integration Points

### External APIs

- **FAYDA API**: Ethiopian National ID verification
- **Payment Gateways**: Future integration for Telebirr, CBE Birr
- **SMS/Email Services**: Notification services

### Hardware Integration

- **RFID/NFC Scanners**: Contactless ID verification
- **Barcode Scanners**: Traditional ID scanning
- **Biometric Devices**: Future fingerprint/face recognition

## Monitoring & Logging

### Application Monitoring

- **Error Tracking**: Client and server error logging
- **Performance Monitoring**: Response time tracking
- **User Analytics**: Access pattern analysis

### Security Monitoring

- **Access Logs**: Complete audit trail
- **Failed Login Attempts**: Security alert system
- **Unauthorized Access**: Real-time notifications

## Future Architecture Enhancements

### Microservices Migration

```
Current: Monolithic Architecture
├── Single Express.js server
└── All endpoints in one file

Future: Microservices Architecture
├── Auth Service
├── User Service
├── File Service
├── Notification Service
└── API Gateway
```

### Real-time Features

- **WebSocket Integration**: Real-time notifications
- **Live Dashboard Updates**: Real-time data visualization
- **Instant Alerts**: Real-time security notifications

### Mobile Application

- **React Native**: Cross-platform mobile app
- **Offline Capability**: Local data storage
- **Push Notifications**: Mobile alerts
