const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute = async (req, res, next) => {
  // Try to get the token from the "Authorization" header
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Assuming it's in the format "Bearer <token>"

    try {
      let isVerified = jwt.verify(token, process.env.JWT_SECRET);
      if (isVerified) {
        const email = isVerified.email;
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.json({
            message: "Could not find User",
          });
        }
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        res.json({
          status: 401,
          message: "Unauthorized",
        });
        res.redirect("/login");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      res.json({
        status: 401,
        message: "Unauthorized",
      });
    }
  } else {
    res.json({
      status: 401,
      message: "Please Login",
    });
  }
};

const isAdmin = function (roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

module.exports = { protectRoute, isAdmin };
