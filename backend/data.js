import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notification from './models/notification.js';

dotenv.config();

// > use mappyboiExercise
// > db.createUser({user: "root", pwd: "poot", roles: ["readWrite"]})

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const mongoPort = `${process.env.DB_HOST}:${process.env.DB_PORT}`;
const db = "mappyboiExercise";

const connectionString = `mongodb://${username}:${password}@${mongoPort}/${db}`;

// Event handlers

mongoose.connection.on("error", 
    (err) => console.log(">> Error!", err))
        || process.exit(0);
mongoose.connection.on("connecting",
    console.log(">> Connecting"));
mongoose.connection.on("disconnecting",
    console.log(">> Disconnecting"));
mongoose.connection.on("disconnected",
    console.log(">> Disconnected"));

try {
    await mongoose.connect(connectionString);

    export function getAllNotifications() {
        const allNotifications = await Notification.getAll();
        allNotifications.forEach((notif) => console.log(notif))
    }
    
    export function saveNotification(input) {
        const newNotification = new Notification({ 
            position: input.position, 
            description: input.description 
        });
        newNotification.save()
            .then(() => console.log("new notfication saved!"))
            .catch(error => console.log("Couldn't save notif", error))
    }

    mongoose.connection.close();

} catch (e) {
    console.log("Errrrrror", e)
}
