import jwt from 'jsonwebtoken'

export const auth = function(req, res, next) {
  // Get token from cookies
  const token = req.cookies.token;
  // console.log(token)

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


// Role-based middleware
export const roleAuth = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
