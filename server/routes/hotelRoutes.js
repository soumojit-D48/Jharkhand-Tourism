

// routes/hotelRoutes.js
import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import {authorize} from '../middlewares/authorizeMiddleware.js'
import {upload} from '../middlewares/multerMiddleware.js';
import {
    // Hotel Controllers
    createHotel,
    getAllHotels,
    getMyHotels,
    getHotelById,
    updateHotel,
    deleteHotelImage,
    deleteHotel,
    
    // Room Controllers
    addRoom,
    addMultipleRooms,
    getHotelRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from '../controllers/hotelController.js';

const router = express.Router();

// ============================================
// HOTEL ROUTES
// ============================================

// Public Routes
router.get('/', getAllHotels); // Get all hotels with filtering, sorting, pagination
router.get('/:hotelId', getHotelById); // Get single hotel by ID

// Manager Routes
router.post(
    '/', 
    userAuth, 
    authorize('manager'), 
    upload.array('images', 10), // Allow up to 10 images
    createHotel
);

router.get(
    '/manager/my-hotels', 
    userAuth, 
    authorize('manager'), 
    getMyHotels
);

router.put(
    '/:hotelId', 
    userAuth, 
    authorize('manager'), 
    upload.array('images', 10),
    updateHotel
);

router.delete(
    '/:hotelId/images', 
    userAuth, 
    authorize('manager'), 
    deleteHotelImage
);

router.delete(
    '/:hotelId', 
    userAuth, 
    authorize('manager'), 
    deleteHotel
);

// ============================================
// ROOM ROUTES
// ============================================

// Public Routes

// done
router.get('/:hotelId/rooms', getHotelRooms); // Get all rooms of a hotel
router.get('/rooms/:roomId', getRoomById); // Get single room

// Manager Routes
router.post(
    '/:hotelId/rooms', 
    userAuth, 
    authorize('manager'), 
    addRoom
);

router.post(
    '/:hotelId/rooms/bulk', 
    userAuth, 
    authorize('manager'), 
    addMultipleRooms
);

router.put(
    '/rooms/:roomId', 
    userAuth, 
    authorize('manager'), 
    updateRoom
);

router.delete(
    '/rooms/:roomId', 
    userAuth, 
    authorize('manager'), 
    deleteRoom
);

export default router;