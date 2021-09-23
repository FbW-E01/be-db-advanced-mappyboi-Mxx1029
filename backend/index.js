import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import requestlogger from "./middleware/requestlogger.js";
import { getAllNotifications, saveNotification } from './data.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestlogger);

app.get("/notifications", (req, res) => {
  // Somehow load data from DB
  getAllNotifications();
  res.json([]);
});

app.post("/notifications", (req, res) => {
  console.log("Received", req.body);
  // Somehow save data to DB
  saveNotification(req.body)
  res.status(201);
  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404);
  res.send("I don't have what you seek");
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
});
