# 🚛 TransitOps – Smart Fleet Management System

<p align="center">

# 🚚 Efficient Fleet. Smarter Operations.

A modern **Fleet Management System** built using the **MERN Stack** to simplify vehicle, driver, trip, maintenance, fuel, and expense management with role-based access and an intuitive dashboard.

</p>

---

## 📖 About The Project

**TransitOps** is a centralized fleet management platform designed to help organizations efficiently manage their transportation operations.

The system enables administrators and managers to monitor vehicles, drivers, trips, maintenance schedules, fuel usage, expenses, and reports from one place.

It improves operational efficiency by providing a secure, scalable, and user-friendly interface.

---

# ✨ Features

## 🔐 Authentication & Security

- Secure Login System
- JWT Authentication
- Password Encryption (bcrypt)
- Protected Routes
- Role-Based Authorization
- Forgot Password
- Session Management

---

## 👤 User Management

- Admin Dashboard
- User Management
- Create Users
- Edit Users
- Delete Users
- Profile Management
- Role Assignment

---

## 🚛 Vehicle Management

- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- Vehicle Details
- Vehicle Status
- Registration Information
- Capacity Details
- Vehicle Documents

---

## 👨‍✈️ Driver Management

- Add Drivers
- Driver Profiles
- Driving License Management
- License Expiry Tracking
- Driver Assignment
- Driver Details

---

## 🛣 Trip Management

- Create Trips
- Assign Driver
- Assign Vehicle
- Dispatch Trips
- Complete Trips
- Cancel Trips
- Trip History
- My Trips

---

## ⛽ Fuel Management

- Fuel Logs
- Fuel Consumption
- Fuel Tracking
- Mileage Monitoring
- Fuel Reports

---

## 🔧 Maintenance Management

- Maintenance Scheduling
- Repair History
- Service Records
- Upcoming Maintenance
- Maintenance Logs

---

## 💰 Expense Management

- Vehicle Expenses
- Fuel Expenses
- Maintenance Expenses
- Expense Tracking
- Expense Reports

---

## 📊 Dashboard & Analytics

- Fleet Dashboard
- Driver Dashboard
- Finance Dashboard
- Safety Dashboard
- Interactive Charts
- Statistics Cards
- Performance Overview

---

## 📑 Reports

- Fleet Reports
- Fuel Reports
- Expense Reports
- ROI Reports
- Vehicle Reports

---

## 🔔 Notifications

- Maintenance Alerts
- Driver Alerts
- Vehicle Alerts
- System Notifications

---

# 🛠 Tech Stack

## Frontend

- ⚛ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- React Router DOM
- Context API
- Axios

---

## Backend

- 🟢 Node.js
- 🚀 Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

---

## Database

- 🍃 MongoDB Atlas

---

# 📂 Project Structure

```
TransitOps
│
├── client
│   ├── src
│   ├── public
│   ├── assets
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/TransitOps.git
```

---

## Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=Your_MongoDB_URI

JWT_SECRET=Your_JWT_Secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_password
```

---

# ▶️ Run the Application

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 👥 User Roles

| Role | Access |
|------|--------|
| 👑 Admin | Full System Access |
| 🚛 Fleet Manager | Fleet & Vehicle Management |
| 💰 Finance Manager | Expense & Reports |
| 🛡 Safety Manager | Driver & Safety Monitoring |
| 🚗 Driver | Personal Dashboard & Trips |

---

# 📸 Screenshots

Add screenshots here.

```
📁 screenshots/

Dashboard.png

Vehicle.png

Drivers.png

Trips.png

Reports.png

Login.png
```

---

# 🚀 Future Scope

- 📍 Live GPS Tracking
- 📱 Mobile Application
- 📊 Advanced Analytics
- 📄 PDF Report Generation
- ☁ Cloud Storage
- 🔔 Push Notifications
- 📈 Enhanced Dashboard
- 🌐 Multi-language Support

---

# 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create your branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Team Members

| Name | Role |
|------|------|
| 👨‍💻 Raj Soni | Full Stack Developer |
| 👨‍💻 Kush Sharma | Full Stack Developer |
| 👨‍💻 Kushal | Full Stack Developer |
| 👨‍💻 Piyush | Full Stack Developer |

---

# 📄 License

This project is developed for educational and collaborative purposes.

---

<div align="center">

### 🚛 TransitOps

**Smart Fleet Management Made Simple**

⭐ If you found this project helpful, don't forget to **Star** the repository!

Made with ❤️ by **Team TransitOps**

</div>