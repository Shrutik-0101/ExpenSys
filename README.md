# 💸 ExpenSys: Full-Stack Expense Tracker

ExpenSys is a secure, cloud-native expense tracker app built with **React** and **Node.js**, offering real-time expense tracking, budget visualization, and profile management.

Initially developed with **MongoDB**, the app was later migrated to **PostgreSQL (AWS RDS)** and deployed using a **custom AWS architecture**.

## Overview

Track your spending habits, visualize budgets, and manage your profile securely all in one place.

### Key Features
- 🔐 **User Authentication** (Signup/Login with JWT)
- 💸 **Expense Management** (Add, Edit, Delete)
- 📊 **Budget Progress Bar** that fills as you spend
- 📋 **Expense History List** with date, title, amount
- 👤 **Profile Update** with bio, email, and picture upload
- 🌐 Fully deployed on AWS with secure RDS setup

---

## Tech Stack

| Layer         |  Tools & Frameworks                                     |
|---------------|---------------------------------------------------------|
| **Frontend**  |  React, React Hooks, Styled Components                  |
| **Backend**   |  Node.js                                                |
| **Database**  |  PostgreSQL (AWS RDS, migrated from MongoDB Atlas)      |
| **DevOps**    |  AWS EC2, VPC, RDS, Route 53, Client VPN                |

---

## Architecture Highlights (AWS)

- **EC2 Instance (Public Subnet)**  
  Hosts both frontend and backend using NGINX as a reverse proxy.
  
- **RDS (Private Subnet)**  
  PostgreSQL database is not exposed publicly. Accessible **only via AWS Client VPN**.

- **Custom Domain**  
  Registered via godaddy and mapped using **Route 53**.  
  `shrutik.xyz` → points to EC2 public IP via A record.

- **Security**  
  Strict **Security Groups**, **No public access to DB**, VPN-only DB access.

---

## Local Setup (For Development)

```bash
git clone https://github.com/yourusername/expensys-app.git
cd expensys-app

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd ../frontend
npm install
npm start
