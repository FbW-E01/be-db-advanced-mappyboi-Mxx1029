import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    // location: {
    //     type: String,
    //     enum: ["Point"],
    //     required: true
    // },
    // coordinates: {
    //     type: [Number],
    //     required: true
    // }
    position: {},
    description: String
})

notificationSchema.statics.getAll() = function() {
    return this.find().exec();
}

const Notification = mongoose.model("notifications", notificationSchema);

export default Notification;