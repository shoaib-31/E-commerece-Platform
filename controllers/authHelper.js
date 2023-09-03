const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute = async (req, res, next) => {
  if (req.cookies.login) {
    let isVerified = jwt.verify(req.cookies.login, process.env.JWT_SECRET);
    if (isVerified) {
      const user = await User.findById(isVerified.userId);
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
      //   res.redirect("/login");
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
