import userRoute from "./userRoute.json";
import taskRoute from "./taskRoute.json";
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Todo App API Documentation",
    version: "1.0.0",
    description: "API documentation for the todo app",
    contact: {
      email: "zeeshan.75way@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
  paths: {
    ...userRoute,
    ...taskRoute,
  },
};

export default swaggerDocument;
