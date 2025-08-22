# 🚀 FAYDA System Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Environment](#development-environment)
3. [Production Deployment](#production-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Security Configuration](#security-configuration)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

#### Server Requirements
- **Operating System**: Ubuntu 20.04+ / CentOS 8+ / Windows Server 2019+
- **CPU**: 2+ cores
- **RAM**: 4GB+ (8GB recommended)
- **Storage**: 50GB+ SSD
- **Network**: Stable internet connection

#### Software Requirements
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **MySQL**: v8.0 or higher
- **Nginx**: v1.18+ (for reverse proxy)
- **PM2**: For process management
- **Git**: For version control

#### Domain & SSL
- **Domain Name**: Registered domain for your application
- **SSL Certificate**: Valid SSL certificate (Let's Encrypt recommended)
- **DNS Configuration**: Proper DNS records

## Development Environment

### Local Setup

#### 1. Clone Repository
```bash
git clone <repository-url>
cd INSA_PROJECT
```

#### 2. Install Dependencies
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

#### 3. Database Setup
```bash
# Start MySQL service
sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE central_registry;
```

#### 4. Environment Configuration
```bash
# Server environment
cd server
cp .env.example .env
# Edit .env with your configuration

# Client environment
cd ../client
cp .env.example .env
# Edit .env with your configuration
```

#### 5. Start Development Servers
```bash
# Start server (Terminal 1)
cd server
npm run dev

# Start client (Terminal 2)
cd client
npm start
```

### Development Scripts

#### Package.json Scripts
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd ../client && npm run build",
    "build:server": "echo 'Server build complete'",
    "test": "jest",
    "lint": "eslint .",
    "migrate": "node scripts/migrate.js"
  }
}
```

## Production Deployment

### Deployment Options

#### Option 1: Traditional VPS/Server

##### Server Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

##### Application Deployment
```bash
# Clone application
git clone <repository-url> /var/www/faydasystem
cd /var/www/faydasystem

# Install dependencies
npm install
cd client && npm install && npm run build
cd ../server && npm install

# Set permissions
sudo chown -R www-data:www-data /var/www/faydasystem
sudo chmod -R 755 /var/www/faydasystem
```

#### Option 2: Cloud Deployment (AWS)

##### AWS Setup
```bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS
aws configure
```

##### EC2 Instance Setup
```bash
# Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --count 1 \
  --instance-type t2.medium \
  --key-name your-key-pair \
  --security-group-ids sg-xxxxxxxxx
```

##### Application Deployment on AWS
```bash
# Connect to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm mysql-server nginx

# Deploy application
git clone <repository-url> /var/www/faydasystem
cd /var/www/faydasystem
npm install
cd client && npm install && npm run build
```

#### Option 3: Container Deployment (Docker)

##### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

FROM node:18-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./

FROM node:18-alpine
WORKDIR /app
COPY --from=server-builder /app/server ./server
COPY --from=client-builder /app/client/build ./server/public
EXPOSE 5000
CMD ["node", "server/index.js"]
```

##### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    volumes:
      - ./uploads:/app/server/uploads

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: your_root_password
      MYSQL_DATABASE: central_registry
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  mysql_data:
```

### Nginx Configuration

#### Reverse Proxy Setup
```nginx
# /etc/nginx/sites-available/faydasystem
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Client Max Body Size
    client_max_body_size 10M;

    # Static Files
    location / {
        root /var/www/faydasystem/client/build;
        try_files $uri $uri/ /index.html;
    }

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File Uploads
    location /uploads/ {
        alias /var/www/faydasystem/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/faydasystem /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### PM2 Configuration

#### Ecosystem File
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'faydasystem',
    script: 'server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

#### PM2 Commands
```bash
# Start application
pm2 start ecosystem.config.js --env production

# Monitor application
pm2 monit

# View logs
pm2 logs faydasystem

# Restart application
pm2 restart faydasystem

# Stop application
pm2 stop faydasystem

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

## Environment Configuration

### Production Environment Variables

#### Server (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_USER=fayda_user
DB_PASSWORD=secure_password_here
DB_NAME=central_registry

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=8h

# Server Configuration
PORT=5000
NODE_ENV=production

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Security Configuration
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring Configuration
LOG_LEVEL=info
ENABLE_MONITORING=true
```

#### Client (.env)
```env
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_ENV=production
REACT_APP_VERSION=1.0.0
```

### Environment-Specific Configurations

#### Development
```javascript
// config/development.js
module.exports = {
  database: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'central_registry'
  },
  server: {
    port: 5000,
    cors: {
      origin: 'http://localhost:3000'
    }
  }
};
```

#### Production
```javascript
// config/production.js
module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  server: {
    port: process.env.PORT || 5000,
    cors: {
      origin: process.env.CORS_ORIGIN
    }
  }
};
```

## Database Setup

### Production Database Configuration

#### MySQL Configuration
```sql
-- Create database user
CREATE USER 'fayda_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON central_registry.* TO 'fayda_user'@'localhost';
FLUSH PRIVILEGES;

-- Create database
CREATE DATABASE central_registry CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use database
USE central_registry;
```

#### Database Migration Script
```javascript
// scripts/migrate.js
const mysql = require('mysql2');
const config = require('../config/production');

const db = mysql.createConnection(config.database);

const migrations = [
  // Companies table
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
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // Super admins table
  `CREATE TABLE IF NOT EXISTS super_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(120),
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(30) DEFAULT 'SuperAdmin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
];

async function runMigrations() {
  try {
    for (const migration of migrations) {
      await db.promise().query(migration);
      console.log('Migration executed successfully');
    }
    console.log('All migrations completed');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    db.end();
  }
}

runMigrations();
```

### Database Backup Strategy

#### Automated Backup Script
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/faydasystem"
DB_NAME="central_registry"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u fayda_user -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Backup uploads directory
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz /var/www/faydasystem/server/uploads/

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

#### Cron Job Setup
```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /var/www/faydasystem/scripts/backup.sh
```

## Security Configuration

### SSL Certificate Setup

#### Let's Encrypt Installation
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Security Headers

#### Nginx Security Configuration
```nginx
# Security headers
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:;";
```

### Firewall Configuration

#### UFW Setup
```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Allow MySQL (if external access needed)
sudo ufw allow 3306

# Check status
sudo ufw status
```

### Rate Limiting

#### Nginx Rate Limiting
```nginx
# Rate limiting configuration
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

location /api/login {
    limit_req zone=login burst=5 nodelay;
    proxy_pass http://localhost:5000/login;
}

location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://localhost:5000/;
}
```

## Monitoring & Maintenance

### Application Monitoring

#### PM2 Monitoring
```bash
# Monitor application
pm2 monit

# View real-time logs
pm2 logs faydasystem --lines 100

# Monitor system resources
pm2 status
```

#### Log Management
```bash
# Log rotation configuration
sudo nano /etc/logrotate.d/faydasystem

# Configuration
/var/www/faydasystem/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### Performance Monitoring

#### Node.js Performance Monitoring
```javascript
// server/monitoring.js
const monitoring = require('@google-cloud/monitoring');

const client = new monitoring.MetricServiceClient();

async function createCustomMetric() {
  const request = {
    name: client.projectPath(process.env.GOOGLE_CLOUD_PROJECT),
    metricDescriptor: {
      type: 'custom.googleapis.com/faydasystem/users',
      displayName: 'FAYDA System Users',
      description: 'Number of users in the system'
    }
  };

  const [descriptor] = await client.createMetricDescriptor(request);
  console.log('Created custom metric:', descriptor.name);
}
```

### Health Checks

#### Health Check Endpoint
```javascript
// server/index.js
app.get('/health', (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: 'connected'
  };

  // Check database connection
  db.query('SELECT 1', (err) => {
    if (err) {
      health.database = 'disconnected';
      health.status = 'ERROR';
      return res.status(503).json(health);
    }
    res.json(health);
  });
});
```

### Automated Maintenance

#### Maintenance Script
```bash
#!/bin/bash
# maintenance.sh

echo "Starting maintenance tasks..."

# Update application
cd /var/www/faydasystem
git pull origin main

# Install dependencies
npm install
cd client && npm install && npm run build
cd ../server && npm install

# Restart application
pm2 restart faydasystem

# Clean old logs
find /var/www/faydasystem/logs -name "*.log" -mtime +30 -delete

# Optimize database
mysql -u fayda_user -p$DB_PASSWORD central_registry -e "OPTIMIZE TABLE companies, super_admins;"

echo "Maintenance completed"
```

## Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check Node.js version
node --version

# Check port availability
sudo netstat -tulpn | grep :5000

# Check logs
pm2 logs faydasystem

# Check environment variables
echo $NODE_ENV
echo $DB_HOST
```

#### Database Connection Issues
```bash
# Test database connection
mysql -u fayda_user -p -h localhost central_registry

# Check MySQL status
sudo systemctl status mysql

# Check MySQL logs
sudo tail -f /var/log/mysql/error.log
```

#### Nginx Issues
```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Performance Issues

#### High CPU Usage
```bash
# Check process usage
top
htop

# Check Node.js processes
ps aux | grep node

# Monitor specific process
strace -p <process_id>
```

#### High Memory Usage
```bash
# Check memory usage
free -h

# Check Node.js memory
node --max-old-space-size=4096 server/index.js

# Monitor memory leaks
node --inspect server/index.js
```

### Security Issues

#### SSL Certificate Problems
```bash
# Check certificate validity
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout

# Renew certificate manually
sudo certbot renew --dry-run

# Check certificate expiration
sudo certbot certificates
```

#### Firewall Issues
```bash
# Check UFW status
sudo ufw status

# Check iptables rules
sudo iptables -L

# Test port accessibility
telnet your-domain.com 443
```

### Recovery Procedures

#### Application Recovery
```bash
# Restart application
pm2 restart faydasystem

# If PM2 fails, restart manually
pkill node
cd /var/www/faydasystem/server
node index.js
```

#### Database Recovery
```bash
# Restore from backup
mysql -u fayda_user -p central_registry < /var/backups/faydasystem/db_backup_20240101_120000.sql

# Check database integrity
mysqlcheck -u fayda_user -p --all-databases
```

#### System Recovery
```bash
# Reboot system
sudo reboot

# Check system resources
df -h
free -h
top

# Check service status
sudo systemctl status nginx mysql
```

---

**Note**: This deployment guide should be updated regularly to reflect the latest best practices and security recommendations.
