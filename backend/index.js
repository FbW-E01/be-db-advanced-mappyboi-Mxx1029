import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import requestlogger from "./middleware/requestlogger.js";
// import { getAllNotifications, saveNotification } from './data.js';
import Notification from './models/notification.js';
// Joel's solution 
import mongoose from 'mongoose';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestlogger);

// > use mappyboiExercise
// > db.createUser({user: "jocelyn", pwd: "poot", roles: ["readWrite"]})

const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
const db = "mappyboiExercise";

const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${db}`;

// Event handlers

mongoose.connection.on("error", 
    (err) => console.log(">> Error!", err))
        || process.exit(0);
mongoose.connection.on("connecting",
    () => console.log(">> Connecting"));
mongoose.connection.on("disconnecting",
    () => console.log(">> Disconnecting"));
mongoose.connection.on("disconnected",
    () => console.log(">> Disconnected"));

app.get("/notifications", (req, res) => {
	// Somehow load data from DB
	// getAllNotifications();

	mongoose.connect(connectionString)
		.then(async () => {
			const allNotifications = await Notification.find({});
			res.json(allNotifications)
		})
		.catch((err) => {
			console.log("Error connecting to MongoDB", err);
			res.status(500);
			res.json({ success: false, error: "Connection error!" });
		})
		.finally(() => {
		mongoose.connection.close();
		})
});

app.post("/notifications", (req, res) => {
  console.log("Received", req.body);
  // Somehow save data to DB
  // saveNotification(req.body)
  // Joel's solution
  
	mongoose.connect(connectionString)
		.then(async () => {
			console.log("Saving report");
			const notification = new Notification(req.body); 

			await notification.save()

			console.log("Report saved!");
			res.status(201);
			res.json({ success: true });
		})
		.catch((err) => {
			console.log("Error connecting to MongoDB", err);
			res.status(500);
			res.json({ success: false, error: "Connection error!" });
		})
		.finally(() => {
		mongoose.connection.close();
		})
});

app.use((req, res) => {
  res.status(404);
  res.send("I don't have what you seek");
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
});
