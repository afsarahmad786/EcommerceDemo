const roleMiddleware = (role) => {
    return (req, res, next) => {
      console.log('role',req.user.role ,role)
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  