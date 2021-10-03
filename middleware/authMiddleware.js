const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
  }
  next();
};

module.exports = { protect };
