

import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import {authorize} from '../middlewares/authorizeMiddleware.js'
import { 
    getPendingRequests, 
    approveRole, 
    rejectRole, 
    addAdmin, 
    removeAdmin, 
    getAllAdmins
} from '../controllers/adminController.js';

const router = express.Router();

// All routes require authentication AND admin role
router.get('/pending-requests', userAuth, authorize('admin'), getPendingRequests);
router.put('/approve/:userId', userAuth, authorize('admin'), approveRole);
router.put('/reject/:userId', userAuth, authorize('admin'), rejectRole);

router.get('/get-admins', userAuth, authorize('admin'), getAllAdmins);
router.post('/add-admin', userAuth, authorize('admin'), addAdmin);
router.delete('/remove-admin/:userId', userAuth, authorize('admin'), removeAdmin);

export default router;