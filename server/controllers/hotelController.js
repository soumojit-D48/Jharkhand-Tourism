
import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

import { uploadOnCloudinary, deleteFromCloudinary } from '../config/cloudinaryConfig.js'

import fs from 'fs';


// export const createHotel = async (req, res) => {
//     try {
//         const { name, description, location, priceRange } = req.body;

//         // Validate required fields
//         if (!name || !description || !location?.district || !location?.address) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Please provide all required fields" 
//             });
//         }

//         if (!priceRange?.min || !priceRange?.max) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Please provide price range (min and max)" 
//             });
//         }

//         // Handle multiple image uploads
//         let imageUrls = [];
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 const result = await uploadOnCloudinary(file.path);
//                 if (result) {
//                     imageUrls.push(result.secure_url);
//                 }
//             }
//         }

//         const hotel = await Hotel.create({
//             name,
//             description,
//             location: JSON.parse(location),
//             priceRange: JSON.parse(priceRange),
//             images: imageUrls,
//             createdBy: req.user._id
//         });

//         res.status(201).json({
//             success: true,
//             message: "Hotel created successfully",
//             hotel
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };





export const createHotel = async (req, res) => {
    try {
        const { name, description, location, priceRange } = req.body;

        // Parse location and priceRange if they are strings
        let parsedLocation = location;
        let parsedPriceRange = priceRange;

        if (typeof location === 'string') {
            try {
                parsedLocation = JSON.parse(location);
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid location format"
                });
            }
        }

        if (typeof priceRange === 'string') {
            try {
                parsedPriceRange = JSON.parse(priceRange);
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid price range format"
                });
            }
        }

        // Validate required fields
        if (!name || !description || !parsedLocation?.district || !parsedLocation?.address) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (name, description, location with district and address)"
            });
        }

        if (!parsedPriceRange?.min || !parsedPriceRange?.max) {
            return res.status(400).json({
                success: false,
                message: "Please provide price range (min and max)"
            });
        }

        // Handle multiple image uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadOnCloudinary(file.path);
                if (result) {
                    imageUrls.push(result.secure_url);
                }
            }
        }

        const hotel = await Hotel.create({
            name,
            description,
            location: parsedLocation,
            priceRange: parsedPriceRange,
            images: imageUrls,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Hotel created successfully",
            hotel
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get All Hotels (Public - with filtering, sorting, pagination)
export const getAllHotels = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            district,
            minPrice,
            maxPrice,
            rating,
            sortBy = 'createdAt',
            order = 'desc',
            search
        } = req.query;

        // Build filter object
        const filter = {};

        if (district) {
            filter['location.district'] = { $regex: district, $options: 'i' };
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            filter['priceRange.min'] = {};
            if (minPrice) filter['priceRange.min'].$gte = Number(minPrice);
            if (maxPrice) filter['priceRange.max'] = { $lte: Number(maxPrice) };
        }

        if (rating) {
            filter.rating = { $gte: Number(rating) };
        }

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortBy]: sortOrder };

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Execute query
        const hotels = await Hotel.find(filter)
            .populate('createdBy', 'name email')
            .populate('rooms')
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Hotel.countDocuments(filter);

        res.status(200).json({
            success: true,
            hotels,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; // public route have to do


// Get Manager's Hotels
export const getMyHotels = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

        const skip = (page - 1) * limit;
        const sortOrder = order === 'asc' ? 1 : -1;

        const hotels = await Hotel.find({ createdBy: req.user._id })
            .populate('rooms')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit));

        const total = await Hotel.countDocuments({ createdBy: req.user._id });

        res.status(200).json({
            success: true,
            hotels,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get Single Hotel by ID
export const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId)
            .populate('rooms')
            .populate('createdBy', 'name email');

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        res.status(200).json({
            success: true,
            hotel
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// Update Hotel
export const updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check authorization
        if (hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this hotel"
            });
        }

        const { name, description, location, priceRange } = req.body;

        // Update basic fields
        if (name) hotel.name = name;
        if (description) hotel.description = description;
        // if (location) hotel.location = { ...hotel.location, ...JSON.parse(location) };
        if (location) {
            const parsedLocation = JSON.parse(location);
            hotel.location = {
                ...hotel.location.toObject(),   // keep old values
                ...parsedLocation,              // update new ones
                coordinates: {                  // preserve coordinates if missing
                    ...(hotel.location.coordinates || {}),
                    ...(parsedLocation.coordinates || {})
                }
            };
        }

        if (priceRange) hotel.priceRange = JSON.parse(priceRange);

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadOnCloudinary(file.path);
                if (result) {
                    hotel.images.push(result.secure_url);
                }
            }
        }

        await hotel.save();

        res.status(200).json({
            success: true,
            message: "Hotel updated successfully",
            hotel
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Hotel Image
export const deleteHotelImage = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image URL is required"
            });
        }

        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check authorization
        if (hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete images from this hotel"
            });
        }

        // Delete from Cloudinary
        await deleteFromCloudinary(imageUrl);

        // Remove from hotel images array
        hotel.images = hotel.images.filter(img => img !== imageUrl);
        await hotel.save();

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
            images: hotel.images
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete Hotel
export const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check authorization
        if (hotel.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this hotel"
            });
        }

        // Delete all images from Cloudinary
        for (const imageUrl of hotel.images) {
            await deleteFromCloudinary(imageUrl);
        }

        // Delete all "rooms" associated with this hotel
        await Room.deleteMany({ hotel: hotel._id });

        // Delete hotel
        await Hotel.findByIdAndDelete(req.params.hotelId);

        res.status(200).json({
            success: true,
            message: "Hotel and associated rooms deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// export const addRoom = async (req, res) => {
//     try {
//         const { hotelId } = req.params;
//         const { roomType, beds, baths, capacity, isPetAllowed, pricePerNight, amenities } = req.body;

//         // Find hotel and verify ownership
//         const hotel = await Hotel.findById(hotelId);

//         if (!hotel) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Hotel not found" 
//             });
//         }

//         if (hotel.createdBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "You are not authorized to add rooms to this hotel" 
//             });
//         }

//         // Validate required fields
//         if (!roomType || !pricePerNight || !capacity) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Please provide roomType, pricePerNight, and capacity" 
//             });
//         }

//         // Create room
//         const room = await Room.create({
//             hotel: hotelId,
//             roomType,
//             beds: beds || 1,
//             baths: baths || 1,
//             capacity,
//             isPetAllowed: isPetAllowed || false,
//             pricePerNight,
//             amenities: amenities ? JSON.parse(amenities) : []
//         });

//         // Add room to hotel's rooms array
//         hotel.rooms.push(room._id);

//         // Update hotel's price range
//         const allRooms = await Room.find({ hotel: hotelId });
//         const prices = allRooms.map(r => r.pricePerNight);
//         hotel.priceRange = {
//             min: Math.min(...prices),
//             max: Math.max(...prices)
//         };

//         await hotel.save();

//         res.status(201).json({
//             success: true,
//             message: "Room added successfully",
//             room
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Add Multiple Rooms
// export const addMultipleRooms = async (req, res) => {
//     try {
//         const { hotelId } = req.params;
//         const { rooms } = req.body;

//         const hotel = await Hotel.findById(hotelId);

//         if (!hotel) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Hotel not found" 
//             });
//         }

//         if (hotel.createdBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "You are not authorized to add rooms to this hotel" 
//             });
//         }

//         if (!Array.isArray(rooms) || rooms.length === 0) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Please provide rooms array" 
//             });
//         }

//         // Add hotelId to each room
//         const roomsWithHotel = rooms.map(room => ({
//             ...room,
//             hotel: hotelId,
//             beds: room.beds || 1,
//             baths: room.baths || 1,
//             isPetAllowed: room.isPetAllowed || false
//         }));

//         // Create all rooms
//         const createdRooms = await Room.insertMany(roomsWithHotel);

//         // Add room IDs to hotel
//         hotel.rooms.push(...createdRooms.map(r => r._id));

//         // Update price range
//         const allRooms = await Room.find({ hotel: hotelId });
//         const prices = allRooms.map(r => r.pricePerNight);
//         hotel.priceRange = {
//             min: Math.min(...prices),
//             max: Math.max(...prices)
//         };

//         await hotel.save();

//         res.status(201).json({
//             success: true,
//             message: `${createdRooms.length} rooms added successfully`,
//             rooms: createdRooms
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get Hotel's Rooms (with filtering and sorting)
// export const getHotelRooms = async (req, res) => {
//     try {
//         const { hotelId } = req.params;
//         const { 
//             roomType, 
//             minPrice, 
//             maxPrice, 
//             capacity,
//             isPetAllowed,
//             isAvailable,
//             sortBy = 'pricePerNight',
//             order = 'asc'
//         } = req.query;

//         // Build filter
//         const filter = { hotel: hotelId };

//         if (roomType) filter.roomType = roomType;
//         if (capacity) filter.capacity = { $gte: Number(capacity) };
//         if (typeof isPetAllowed !== 'undefined') filter.isPetAllowed = isPetAllowed === 'true';
//         if (typeof isAvailable !== 'undefined') filter.isAvailable = isAvailable === 'true';

//         if (minPrice || maxPrice) {
//             filter.pricePerNight = {};
//             if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
//             if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
//         }

//         const sortOrder = order === 'asc' ? 1 : -1;

//         const rooms = await Room.find(filter).sort({ [sortBy]: sortOrder });

//         res.status(200).json({
//             success: true,
//             rooms
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get Single Room
// export const getRoomById = async (req, res) => {
//     try {
//         const room = await Room.findById(req.params.roomId).populate('hotel');

//         if (!room) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Room not found" 
//             });
//         }

//         res.status(200).json({
//             success: true,
//             room
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update Room
// export const updateRoom = async (req, res) => {
//     try {
//         const room = await Room.findById(req.params.roomId).populate('hotel');

//         if (!room) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Room not found" 
//             });
//         }

//         // Check authorization
//         if (room.hotel.createdBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "You are not authorized to update this room" 
//             });
//         }

//         const { roomType, beds, baths, capacity, isPetAllowed, pricePerNight, amenities, isAvailable } = req.body;

//         if (roomType) room.roomType = roomType;
//         if (beds) room.beds = beds;
//         if (baths) room.baths = baths;
//         if (capacity) room.capacity = capacity;
//         if (typeof isPetAllowed !== 'undefined') room.isPetAllowed = isPetAllowed;
//         if (pricePerNight) room.pricePerNight = pricePerNight;
//         if (amenities) room.amenities = JSON.parse(amenities);
//         if (typeof isAvailable !== 'undefined') room.isAvailable = isAvailable;

//         await room.save();

//         // Update hotel's price range if price changed
//         if (pricePerNight) {
//             const hotel = await Hotel.findById(room.hotel._id);
//             const allRooms = await Room.find({ hotel: hotel._id });
//             const prices = allRooms.map(r => r.pricePerNight);
//             hotel.priceRange = {
//                 min: Math.min(...prices),
//                 max: Math.max(...prices)
//             };
//             await hotel.save();
//         }

//         res.status(200).json({
//             success: true,
//             message: "Room updated successfully",
//             room
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Delete Room
// export const deleteRoom = async (req, res) => {
//     try {
//         const room = await Room.findById(req.params.roomId).populate('hotel');

//         if (!room) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Room not found" 
//             });
//         }

//         // Check authorization
//         if (room.hotel.createdBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "You are not authorized to delete this room" 
//             });
//         }

//         // Remove room from hotel's rooms array
//         const hotel = await Hotel.findById(room.hotel._id);
//         hotel.rooms = hotel.rooms.filter(
//             id => id.toString() !== room._id.toString()
//         );

//         // Update price range
//         const remainingRooms = await Room.find({ 
//             hotel: hotel._id, 
//             _id: { $ne: room._id } 
//         });

//         if (remainingRooms.length > 0) {
//             const prices = remainingRooms.map(r => r.pricePerNight);
//             hotel.priceRange = {
//                 min: Math.min(...prices),
//                 max: Math.max(...prices)
//             };
//         } else {
//             hotel.priceRange = { min: 0, max: 0 };
//         }

//         await hotel.save();
//         await Room.findByIdAndDelete(req.params.roomId);

//         res.status(200).json({
//             success: true,
//             message: "Room deleted successfully"
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };










// export const addRoom = async (req, res) => {
//     try {
//         const { hotelId } = req.params;
//         const { roomType, beds, baths, capacity, isPetAllowed, pricePerNight, amenities } = req.body;

//         // Find hotel and verify ownership
//         const hotel = await Hotel.findById(hotelId);

//         if (!hotel) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Hotel not found" 
//             });
//         }

//         if (hotel.createdBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "You are not authorized to add rooms to this hotel" 
//             });
//         }

//         // Validate required fields
//         if (!roomType || !pricePerNight || !capacity) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Please provide roomType, pricePerNight, and capacity" 
//             });
//         }

//         // Create room
//         const room = await Room.create({
//             hotel: hotelId,
//             roomType,
//             beds: beds || 1,
//             baths: baths || 1,
//             capacity,
//             isPetAllowed: isPetAllowed || false,
//             pricePerNight,
//             amenities: amenities ? JSON.parse(amenities) : []
//         });

//         // Add room to hotel's rooms array
//         hotel.rooms.push(room._id);

//         // Update hotel's price range
//         const allRooms = await Room.find({ hotel: hotelId });
//         const prices = allRooms.map(r => r.pricePerNight);
//         hotel.priceRange = {
//             min: Math.min(...prices),
//             max: Math.max(...prices)
//         };

//         await hotel.save();

//         res.status(201).json({
//             success: true,
//             message: "Room added successfully",
//             room
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };



// aminities err solved

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

        // Parse amenities if it's a string
        let parsedAmenities = amenities || [];
        if (typeof amenities === 'string') {
            try {
                // Try parsing as JSON array first // "amenities": ["Wi-Fi", "Air Conditioning"]
                parsedAmenities = JSON.parse(amenities);

            } catch (err) { // amenities: "Wi-Fi,Air Conditioning"
                // If that fails, split by comma (fallback for comma-separated strings)
                parsedAmenities = amenities.split(',').map(a => a.trim()).filter(a => a);
            }
        }

        // Ensure it's an array
        if (!Array.isArray(parsedAmenities)) {
            parsedAmenities = [];
        }

        // Create room
        const room = await Room.create({
            hotel: hotelId,
            roomType,
            beds: parseInt(beds) || 1,
            baths: parseInt(baths) || 1,
            capacity: parseInt(capacity),
            isPetAllowed: isPetAllowed === true || isPetAllowed === 'true',
            pricePerNight: parseFloat(pricePerNight),
            amenities: parsedAmenities
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
        const room = await Room
            .findById(req.params.roomId)
            .populate('hotel');

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
        // if (amenities) room.amenities = JSON.parse(amenities);

        // Parse amenities if it's a string
        let parsedAmenities = amenities || [];
        if (typeof amenities === 'string') {
            try {
                // Try parsing as JSON array first // "amenities": ["Wi-Fi", "Air Conditioning"]
                parsedAmenities = JSON.parse(amenities);

            } catch (err) { // amenities: "Wi-Fi,Air Conditioning"
                // If that fails, split by comma (fallback for comma-separated strings)
                parsedAmenities = amenities.split(',').map(a => a.trim()).filter(a => a);
            }
        }

        // Ensure it's an array
        if (!Array.isArray(parsedAmenities)) {
            parsedAmenities = [];
        }
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

