const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied - Admin privileges required" });
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);
    return res.status(403).json({ message: "Authorization failed", error: error.message });
  }
};

module.exports = isAdmin; 