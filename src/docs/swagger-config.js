const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Task Management System API",
    version: "1.0.0",
    description:
      "This is the API documentation for the **Task Management System**, a powerful and flexible application designed to help users efficiently manage and organize tasks. With this API, users can perform key operations such as creating, updating, and deleting tasks, tracking task progress, and managing user profiles and authentication. Ideal for both personal task tracking and collaborative team projects, this API helps streamline task management workflows.",
  },
  servers: [
    {
      url: "http://localhost:2020",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../docs/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
