const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const mailRoutes = require("./routes/mailRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://portfolio-jocelyn.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content",
      "Accept",
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/send-mail", mailRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
