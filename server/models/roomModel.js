

import mongoose from "mongoose";

// utils/amenities.js
export const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "Television",
  "Mini Bar",
  "Room Service",
  "Safe Box",
  "Hair Dryer",
  "Coffee Maker",
  "Balcony",
  "Mountain View",
  "Bathtub",
  "Shower",
  "Towels",
  "Wardrobe",
  "Work Desk",
  "Iron",
  "Laundry Service",
  "Free Parking",
  "Pool Access",
  "Gym Access",
  "Pet Friendly",
  "Smoking Allowed",
  "Non-smoking Room",
];



const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  },
  roomType: {
    type: String,
    enum: ["single", "double", "suite", "deluxe"],
    required: true
  },
  beds: {
    type: Number,
    required: true,
    default: 1
  },
  baths: {
    type: Number,
    required: true,
    default: 1
  },
  capacity: {
    type: Number,
    required: true
  },
  isPetAllowed: {
    type: Boolean,
    default: false
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  amenities: [{
    type: String,
    enum: AMENITIES, 
  }],
}, {
  timestamps: true
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;
