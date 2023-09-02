const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  if (req.cookies.login) {
    let isVerified = jwt.verify(req.cookies.login, process.env.JWT_SECRET);
    if (isVerified) {
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

module.exports = protectRoute;
