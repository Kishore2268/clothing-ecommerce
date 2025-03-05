const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "ADMIN") {
      next();
    } else {
      return res.status(403).json({ error: "Access Denied - Admin Only" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = isAdmin; 