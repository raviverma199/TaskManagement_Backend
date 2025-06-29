# Task Management System - Backend

This repository contains the backend for the Task Management System — built with Node.js, Express, and MongoDB. It includes features like user authentication, task creation, updating, deletion, and filtering. The project also integrates CI/CD using GitHub Actions for automated testing and deployment.

## Table of Contents

- [Features](#Features)
- [Tech Stack](#Tech_Stack)
- [Installation](#Installation)
- [Running Locally](#Running_Locally)
- [API Documentation (Swagger)](#API_Documentation)
- [CI/CD Integration](#CI/CD)

---

### ✅ Features

- 🔐 User Registration & Login (JWT Authentication)
- 🧾 CRUD Operations for Tasks
- 📅 Task filtering (by status, date, etc.)
- 🛡️ Protected routes with middleware
- 🧪 Integrated with GitHub Actions (CI/CD)
- 🧾 API documentation using Swagger


### 🛠 Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT
- Documentation: Swagger UI
- CI/CD: GitHub Actions


### 📦 Installation

## Prerequisites

- Make sure you have the following installed:

- Node.js (v16 or higher)
- npm
- MongoDB (local or cloud instance)


### 🔧 Environment Variables

**Create a .env file in the root directory and add the following variables:**

   ```bash
   SECRET_KEY=your_secret_key
   DB_CONN_STRING=mongodb://localhost:27017/task_management_db
   PORT=2020 # Default port

   ```

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raviverma199/TaskManagement_Backend.git
   cd TaskManagement_Backend

   ```

2. **Install Dependencies:**

   ```bash
   npm install

   ```

3. **Run the following command:**

   ```bash
   npm start

   ```

4. **Access API Documentation:**

   ```bash
   After starting the server, visit the following URL to view the API documentation:
   http://localhost:2020/api-docs

   ```

### ⚙️ CI/CD Integration
This project uses GitHub Actions for:

- Running tests automatically on push
- Lint checks
- Ensuring successful builds before deployment

- You can find the workflow in .github/workflows/ci.yml.
