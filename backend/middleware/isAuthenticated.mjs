import jwt from 'jsonwebtoken';

 const isAuthenticated = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({
       message: 'Invalid or expired token',
       success : false
     });
     console.log('user : ',user.id)
     console.log('user : ',user.email)
    req.user = user;
    next();
  });
};

export default isAuthenticated;