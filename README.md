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

2. **After Clone the repository:**

   ```bash
   npm install

3. **Set Enviroment Variable:**

   ```bash
   Set env file with secret_key,DbConnString(mongodb://localhost:27017/task_management_db) and PORT (Default Port is 2020)

4. **After Setting the Enviroment Variable:**

   ```bash
   Start the server by (npm start) command.

5. **API Documention:**

   ```bash
   Check http://localhost:2020/api-docs for api documention after starting the server on local.