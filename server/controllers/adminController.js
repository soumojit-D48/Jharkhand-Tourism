import User from "../models/userModel.js";
import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import { deleteFromCloudinary } from "../config/cloudinaryConfig.js";


export const getPendingRequests = async (req, res) => {
    try {
        const pendingUsers = await User.find({
            isApproved: false,
            requestedRole: {$ne: null}
        }).select('-password -resetOtp -resetOtpExpireAt')

        res.status(200).json({
            success: true,
            users: pendingUsers
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const approveRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.requestedRole) {
            return res.status(400).json({ success: false, message: 'No role request found' });
        }

        const approvedRole = user.requestedRole
        user.role = approvedRole
        user.requestedRole = null
        user.isApproved = true

        await user.save()

        //  Send approval email later

        res.status(200).json({
            success: true,
            message: `User role updated to ${approvedRole}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const rejectRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.requestedRole) {
            return res.status(400).json({ success: false, message: 'No role request found' });
        }

        const rejectedRole = user.requestedRole;
        user.requestedRole = null;
        user.isApproved = true;
        
        await user.save();

        // Send rejection email later
        
        res.status(200).json({ 
            success: true,
            message: 'Role request rejected',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({role: 'admin'}).select('-password -resetOtp -resetOtpExpireAt');

        res.status(200).json({
            success: true,
            admins
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



// export const getAllManagers = async (req, res) => {
//     try {
//         const managers = await User.find({role: 'manager'})
//             .select('-password -resetOtp -resetOtpExpireAt')
//             // .populate('managedHotels', 'name location')

//         res.status(200).json({
//             success: true,
//             managers
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// export const removeManager = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         if (!userId) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "User ID is required" 
//             });
//         }

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         if (user.role !== "manager") {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "User is not an manager" 
//             });
//         }

//         // Prevent removing yourself if needed (optional security measure)
//         if (req.user && req.user._id.toString() === userId) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "You cannot remove your own admin privileges" 
//             });
//         }

//         user.role = "tourist"; // Revert to default role
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Admin privileges removed successfully",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };




export const getAllManagers = async (req, res) => {
    try {
        const managers = await User.find({ role: 'manager' })
            .select('-password -resetOtp -resetOtpExpireAt')
            .lean(); // Use lean() for better performance

        // Get hotel count for each manager
        const managersWithHotelCount = await Promise.all(
            managers.map(async (manager) => {
                const hotelCount = await Hotel.countDocuments({ createdBy: manager._id });
                return {
                    ...manager,
                    hotelCount
                };
            })
        );

        res.status(200).json({
            success: true,
            managers: managersWithHotelCount
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const removeManager = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "manager") {
            return res.status(400).json({
                success: false,
                message: "User is not a manager"
            });
        }

        // Prevent removing yourself (optional security measure)
        if (req.user && req.user._id.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot remove your own manager privileges"
            });
        }

        // Find all hotels managed by this user
        const hotels = await Hotel.find({ createdBy: userId });

        // Delete all hotels and their associated data
        for (const hotel of hotels) {
            // Delete all images from Cloudinary
            if (hotel.images && hotel.images.length > 0) {
                for (const imageUrl of hotel.images) {
                    try {
                        await deleteFromCloudinary(imageUrl);
                    } catch (err) {
                        console.error(`Failed to delete image: ${imageUrl}`, err);
                        // Continue even if image deletion fails
                    }
                }
            }

            // Delete all rooms associated with this hotel
            await Room.deleteMany({ hotel: hotel._id });

            // Delete the hotel
            await Hotel.findByIdAndDelete(hotel._id);
        }

        // Change user role back to tourist and clear role request data
        user.role = "tourist";
        user.requestedRole = null; // Clear any pending role requests
        user.isApproved = true; // Reset approval status
        await user.save();

        res.status(200).json({
            success: true,
            message: `Manager removed successfully. ${hotels.length} hotel(s) and their rooms deleted.`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            deletedHotels: hotels.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export const addAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.isApproved || !user.isAccountVerified) {
            return res.status(400).json({
                success: false,
                message: "User is not approved or verified",
            });
        }

        if (user.role === "admin") {
            return res.status(400).json({ 
                success: false, 
                message: "User is already an admin" 
            });
        }

        user.role = "admin";
        await user.save();

        res.status(200).json({
            success: true,
            message: `${user.name} is now an Admin!`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const removeAdmin = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        if (user.role !== "admin") {
            return res.status(400).json({ 
                success: false, 
                message: "User is not an admin" 
            });
        }

        // Prevent removing yourself if needed (optional security measure)
        if (req.user && req.user._id.toString() === userId) {
            return res.status(400).json({ 
                success: false, 
                message: "You cannot remove your own admin privileges" 
            });
        }

        user.role = "tourist"; // Revert to default role
        await user.save();

        res.status(200).json({
            success: true,
            message: "Admin privileges removed successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};


