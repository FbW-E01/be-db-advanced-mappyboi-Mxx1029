import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import Notification from './models/notification.js';

dotenv.config();

// // > use mappyboiExercise
// // > db.createUser({user: "root", pwd: "poot", roles: ["readWrite"]})

// const username = process.env.DB_USER;
// const password = process.env.DB_PASS;
// const mongoPort = `${process.env.DB_HOST}:${process.env.DB_PORT}`;
// const db = "mappyboiExercise";

// export const connectionString = `mongodb://${username}:${password}@${mongoPort}/${db}`;

// Joel's solution
// const {DB_USER, DB_PASS, DB_HOST, DB_PORT} = process.env;
// const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${db}`;


// Event handlers

// mongoose.connection.on("error", 
//     (err) => console.log(">> Error!", err))
//         || process.exit(0);
// mongoose.connection.on("connecting",
//     () => console.log(">> Connecting"));
// mongoose.connection.on("disconnecting",
//     () => console.log(">> Disconnecting"));
// mongoose.connection.on("disconnected",
//     () => console.log(">> Disconnected"));

// try {
//     await mongoose.connect(connectionString);

    // exporting gets errors...
    // export function getAllNotifications() {
    //     const allNotifications = await Notification.getAll();
    //     allNotifications.forEach((notif) => console.log(notif))
    // }
    
    // export function saveNotification(input) {
    //     const newNotification = new Notification({ 
    //         position: input.position, 
    //         description: input.description 
    //     });
    //     newNotification.save()
    //         .then(() => console.log("new notfication saved!"))
    //         .catch(error => console.log("Couldn't save notif", error))
    // }

//     mongoose.connection.close();

// } catch (e) {
//     console.log("Errrrrror", e)
// }


// different method to try to connect, but again export gets errors
// mongoose
//     .connect(connectionString)
//     .then(() => {
//         console.log(">> Connected!");
        // export function getAllNotifications() {
        //     const allNotifications = await Notification.getAll();
        //     allNotifications.forEach((notif) => console.log(notif))
        // }
        // export function saveNotification(input) {
        //     const newNotification = new Notification({ 
        //         position: input.position, 
        //         description: input.description 
        //     });
        //     newNotification.save()
        //         .then(() => console.log("new notfication saved!"))
        //         .catch(error => console.log("Couldn't save notif", error))
        // }
    // })
    // .catch(e => {
    //     console.log("error when connecting", e);
    //     process.exit(0);
    // })
    // .finally(() => mongoose.connection.close());

