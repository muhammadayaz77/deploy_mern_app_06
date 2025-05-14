import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied - No token provided',
        success: false 
      });
    }

    // 2. Verify token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({
          message: 'Invalid or expired token',
          success: false
        });
      }
      
      // 3. Attach user ID to request
      req.userId = decoded.userId;
      next();
    });

  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};

export default isAuthenticated;