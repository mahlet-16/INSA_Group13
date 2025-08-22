<<<<<<< HEAD
🇪🇹 Ethiopian National ID Access Control System
📖 What is this?
A unified access control system that uses Ethiopia's mandatory National ID as a universal pass for schools, workplaces, government buildings, and other secure facilities. Think of it as "one ID, everywhere access" with smart security.

🎯 Why do we need this?
Security: Prevent unauthorized people from entering restricted areas
Efficiency: No more multiple cards/passes - just your National ID
Tracking: Real-time monitoring of who enters where and when
Safety: Instant alerts for security breaches or blacklisted individuals

🔧 How it works

Scan your National ID at any entrance
System checks your permissions for that location
Access granted/denied based on your role and schedule
Activity logged for security monitoring
National ID → Scanner → Permission Check → Access Decision → Activity Log

✨ Key Features

🔐 Access Control

National ID card scanning (RFID/NFC)
Role-based permissions (Student, Employee, Visitor, Admin)
Time-based access (work hours, class schedules)
Temporary visitor passes

🛡️ Security

Real-time unauthorized access alerts
Blacklist management
Complete activity audit trail
Emergency lockdown capabilities

📊 Monitoring

Live dashboard showing all access activities
Reports and analytics
Occupancy tracking per location
Security incident management

🏢 Use Cases

Location	Who Gets Access	When
Schools	Students, Teachers, Staff	School hours, scheduled events
Offices	Employees, Contractors	Work hours, meeting times
Government Buildings	Citizens, Officials, Staff	Service hours, appointments
Hospitals	Patients, Doctors, Visitors	Appointment times, visiting hours

🛠️ Tech Stack

Backend: Django REST Framework
Database: PostgreSQL
Frontend: React.js
Hardware: RFID/NFC card readers
=======
# 🇪🇹 FAYDA National ID Verification & Access Control System

A unified web platform that allows Ethiopian companies, institutions, and facilities to verify users and control secure access using the **Ethiopian National ID (FAYDA)**. Built with **React.js**, **Node.js**, **Express**, and **MySQL (via MAMP)**.

---

## 📖 What is this?

A **smart access control and verification system** that uses Ethiopia's mandatory National ID as a universal digital ID pass—for schools, offices, hospitals, and government facilities.

**Think of it as:**  
➡️ "One ID, Everywhere Access"  
➡️ "Verified once, used many places"

---

## 🎯 Why Do We Need This?

| Benefit     | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 🔒 Security | Prevent unauthorized people from entering restricted areas                  |
| ⚡ Efficiency | No need for extra ID cards—just use your National ID                        |
| 🛰 Tracking  | Monitor who accessed what, where, and when                                 |
| 🚨 Safety    | Get alerts for blacklisted or unauthorized individuals                     |

---

## 🔧 How It Works

1. National ID is scanned or entered
2. The system checks:
   - Whether the user is in FAYDA (via API)
   - Whether the user is registered with the organization
   - Whether the user is allowed access now
3. A decision is made: ✅ Access / ❌ Denied
4. Log is saved for security monitoring

**Flow:**  
`National ID → Check in FAYDA & DB → Verify Role & Schedule → Decision → Activity Logged`

---

## ✨ Core Features

### 🔐 Access Control
- National ID-based identity scanning (manual or via RFID/NFC)
- Role-based permissions: Student, Staff, Visitor, Admin
- Time-based access windows (e.g. school hours, shifts)
- Temporary passes for visitors

### 🛡 Security
- Real-time alerts for unauthorized or blacklisted users
- Complete access logs and audit trails
- Emergency lockdown triggers
- Company-specific databases secured via MAMP

### 📊 Monitoring
- Live dashboards with access logs per company
- Reports and visual analytics
- Occupancy tracking and statistics
- Security incident management

---

## 🏢 Use Cases

| Location             | Who Gets Access          | When                          |
|----------------------|--------------------------|-------------------------------|
| 🏫 Schools           | Students, Teachers        | Class hours, school events    |
| 🏢 Offices           | Employees, Contractors    | Work hours, meeting times     |
| 🏛 Government Bldgs  | Citizens, Officials       | Appointments, working hours   |
| 🏥 Hospitals         | Patients, Doctors, Guests | Visiting hours, appointments  |

---

## 🌐 Admin & Company Portal

### Admin:
- Register new companies
- View and manage all companies
- Delete or disable accounts

### Company:
- Login securely with email/password
- Add, update, or delete users (students/employees)
- View verification logs
- Dashboard access for real-time checks

### User:
- Register themselves under a verified company
- Use National ID as login and verification
- Check their status (e.g., "Temesgen Abdissa is working as ENGINEER at XYZ")

---

## 📂 Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React.js                 |
| Backend    | Node.js + Express.js     |
| Database   | MySQL (via MAMP)         |
| Auth       | JWT                      |
| ID Check   | FAYDA API Integration    |
| Optional   | RFID/NFC hardware        |

---



# Contributors ✍️ 

Hebron Enyew Yitbarek

Temesgen Abdissa

Endrias Eshetu Egata

Mahlet Amenu



>>>>>>> 5f8a90f05750b9806b5ebe1e073b78e97e4cb7b4
