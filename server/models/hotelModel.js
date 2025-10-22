
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        district: { type: String, required: true },
        address: { type: String, required: true },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    images: [String], // upload multiple images, update, delete

    rating: {
        type: Number,
        default: 0
    },

    priceRange: { // all rooms will be avaliable btwn these price
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        }
    ],
    createdBy: { // manager
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true // manager who created it
    },
}, {
    timestamps: true
});

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
export default Hotel;
