import User from "../models/User.mjs"



export const getAllAdmin = async (req, res) => {
  try {
    // Find users where role is either 'admin1' or 'admin2'
    const admins = await User.find({
      role: { $in: ['admin1', 'admin2'] }
    }).select('-password'); // Exclude password field for security

    return res.status(200).json({
      message: 'Admins fetched successfully',
      success: true,
      data: admins
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return res.status(500).json({
      message: error.message || 'Failed to fetch admins',
      success: false
    });
  }
};
export const removeAdmin = async (req, res) => {
  try {
    const { id } = req.body;
    
    // Validate input
    if (!id) {
      return res.status(400).json({
        message: 'Admin ID is required',
        success: false,
      });
    }

    // Prevent self-deletion
    if (req.user._id === id) {
      return res.status(400).json({
        message: 'You cannot remove yourself',
        success: false,
      });
    }

    // Find and remove admin
    const removedUser = await User.findOneAndDelete({
      _id: id,
      role: { $in: ['admin1', 'admin2'] } // Only allow removing these roles
    });

    if (!removedUser) {
      return res.status(404).json({
        message: 'Admin not found or not removable',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Admin removed successfully',
      success: true,
      data: removedUser
    });
  } catch (error) {
    console.error('Error removing admin:', error);
    return res.status(500).json({
      message: error.message || 'Failed to remove admin',
      success: false
    });
  }
};