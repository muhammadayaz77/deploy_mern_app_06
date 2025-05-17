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
    // Find users where role is either 'admin1' or 'admin2'
    const {id} = req.body;
    if(!id){
      return res.status(400).json({
        message: 'Required data to proceed',
        success: false,
      });
    }
    let removedUser = await User.findByIdAndDelete({_id:id});
    if(!removedUser){
      return res.status(400).json({
        message: 'Admin not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Admins deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return res.status(500).json({
      message: error.message || 'Failed to fetch admins',
      success: false
    });
  }
};