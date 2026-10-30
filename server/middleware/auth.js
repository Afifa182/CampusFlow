const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protects routes: requires a valid "Authorization: Bearer <token>" header
const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorised, token missing" });
  }
  try {
    const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User no longer exists" });
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorised, token invalid or expired" });
  }
};

module.exports = protect;
