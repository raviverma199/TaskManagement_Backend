# Task Management System - Backend

This repository contains the backend for the Task Management System. The backend is built using Node.js, Express, and MongoDB. It provides APIs for managing tasks, including user registration, authentication, and CRUD operations for tasks.

## Table of Contents

- [Installation](#installation)
- [Setup and Running Locally](#setup-and-running-locally)
- [Swagger Documentation](#swagger-documentation)

---

## Installation

### Prerequisites

Before getting started, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Steps to Install

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raviverma199/TaskManagement_Backend.git
   cd TaskManagement_Backend

   ```

2. **Install Dependencies:**

   ```bash
   npm install

   ```

3. **Create a .env file in the root directory and add the following variables:**

   ```bash
   SECRET_KEY=your_secret_key
   DB_CONN_STRING=mongodb://localhost:27017/task_management_db
   PORT=2020 # Default port

   ```

4. **Run the following command:**

   ```bash
   npm start

   ```

5. **Access API Documentation:**

   ```bash
   After starting the server, visit the following URL to view the API documentation:
   http://localhost:2020/api-docs

   ```
