


import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

import {uploadOnCloudinary, deleteFromCloudinary} from '../config/cloudinaryConfig.js'
import fs from 'fs';



export const addRoom = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { roomType, beds, baths, capacity, isPetAllowed, pricePerNight, amenities } = req.body;

        // Find hotel and verify ownership
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ 
                success: false, 
                message: "Hotel not found" 
            });
        }

        if (hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to add rooms to this hotel" 
            });
        }

        // Validate required fields
        if (!roomType || !pricePerNight || !capacity) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide roomType, pricePerNight, and capacity" 
            });
        }

        // Create room
        const room = await Room.create({
            hotel: hotelId,
            roomType,
            beds: beds || 1,
            baths: baths || 1,
            capacity,
            isPetAllowed: isPetAllowed || false,
            pricePerNight,
            amenities: amenities ? JSON.parse(amenities) : []
        });

        // Add room to hotel's rooms array
        hotel.rooms.push(room._id);

        // Update hotel's price range
        const allRooms = await Room.find({ hotel: hotelId });
        const prices = allRooms.map(r => r.pricePerNight);
        hotel.priceRange = {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };

        await hotel.save();

        res.status(201).json({
            success: true,
            message: "Room added successfully",
            room
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add Multiple Rooms
export const addMultipleRooms = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { rooms } = req.body;

        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ 
                success: false, 
                message: "Hotel not found" 
            });
        }

        if (hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to add rooms to this hotel" 
            });
        }

        if (!Array.isArray(rooms) || rooms.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide rooms array" 
            });
        }

        // Add hotelId to each room
        const roomsWithHotel = rooms.map(room => ({
            ...room,
            hotel: hotelId,
            beds: room.beds || 1,
            baths: room.baths || 1,
            isPetAllowed: room.isPetAllowed || false
        }));

        // Create all rooms
        const createdRooms = await Room.insertMany(roomsWithHotel);

        // Add room IDs to hotel
        hotel.rooms.push(...createdRooms.map(r => r._id));

        // Update price range
        const allRooms = await Room.find({ hotel: hotelId });
        const prices = allRooms.map(r => r.pricePerNight);
        hotel.priceRange = {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };

        await hotel.save();

        res.status(201).json({
            success: true,
            message: `${createdRooms.length} rooms added successfully`,
            rooms: createdRooms
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Hotel's Rooms (with filtering and sorting)
export const getHotelRooms = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { 
            roomType, 
            minPrice, 
            maxPrice, 
            capacity,
            isPetAllowed,
            isAvailable,
            sortBy = 'pricePerNight',
            order = 'asc'
        } = req.query;

        // Build filter
        const filter = { hotel: hotelId };

        if (roomType) filter.roomType = roomType;
        if (capacity) filter.capacity = { $gte: Number(capacity) };
        if (typeof isPetAllowed !== 'undefined') filter.isPetAllowed = isPetAllowed === 'true';
        if (typeof isAvailable !== 'undefined') filter.isAvailable = isAvailable === 'true';

        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
            if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
        }

        const sortOrder = order === 'asc' ? 1 : -1;

        const rooms = await Room.find(filter).sort({ [sortBy]: sortOrder });

        res.status(200).json({
            success: true,
            rooms
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Room
export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId).populate('hotel');

        if (!room) {
            return res.status(404).json({ 
                success: false, 
                message: "Room not found" 
            });
        }

        res.status(200).json({
            success: true,
            room
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Room
export const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId).populate('hotel');

        if (!room) {
            return res.status(404).json({ 
                success: false, 
                message: "Room not found" 
            });
        }

        // Check authorization
        if (room.hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to update this room" 
            });
        }

        const { roomType, beds, baths, capacity, isPetAllowed, pricePerNight, amenities, isAvailable } = req.body;

        if (roomType) room.roomType = roomType;
        if (beds) room.beds = beds;
        if (baths) room.baths = baths;
        if (capacity) room.capacity = capacity;
        if (typeof isPetAllowed !== 'undefined') room.isPetAllowed = isPetAllowed;
        if (pricePerNight) room.pricePerNight = pricePerNight;
        if (amenities) room.amenities = JSON.parse(amenities);
        if (typeof isAvailable !== 'undefined') room.isAvailable = isAvailable;

        await room.save();

        // Update hotel's price range if price changed
        if (pricePerNight) {
            const hotel = await Hotel.findById(room.hotel._id);
            const allRooms = await Room.find({ hotel: hotel._id });
            const prices = allRooms.map(r => r.pricePerNight);
            hotel.priceRange = {
                min: Math.min(...prices),
                max: Math.max(...prices)
            };
            await hotel.save();
        }

        res.status(200).json({
            success: true,
            message: "Room updated successfully",
            room
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Room
export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId).populate('hotel');

        if (!room) {
            return res.status(404).json({ 
                success: false, 
                message: "Room not found" 
            });
        }

        // Check authorization
        if (room.hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to delete this room" 
            });
        }

        // Remove room from hotel's rooms array
        const hotel = await Hotel.findById(room.hotel._id);
        hotel.rooms = hotel.rooms.filter(
            id => id.toString() !== room._id.toString()
        );

        // Update price range
        const remainingRooms = await Room.find({ 
            hotel: hotel._id, 
            _id: { $ne: room._id } 
        });

        if (remainingRooms.length > 0) {
            const prices = remainingRooms.map(r => r.pricePerNight);
            hotel.priceRange = {
                min: Math.min(...prices),
                max: Math.max(...prices)
            };
        } else {
            hotel.priceRange = { min: 0, max: 0 };
        }

        await hotel.save();
        await Room.findByIdAndDelete(req.params.roomId);

        res.status(200).json({
            success: true,
            message: "Room deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};