const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models/db");
const bodyParser = require("body-parser");
const productRoute = require("./routers/productRouter");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const userRoute = require("./routers/userRouter");
const orderRoute = require("./routers/orderRouter");
const paymentRoute = require("./routers/paymentRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Specify the allowed origin (replace with your frontend's actual origin)
const allowedOrigins = ["https://e-commerece-platform-9bee.vercel.app/"]; // Add your frontend's URL here

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If the origin is in the allowed list or is not defined (e.g., same-origin request), allow it
      callback(null, true);
    } else {
      // If the origin is not allowed, reject the request
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();
app.get("/", (req, res) => {
  res.json("hello world");
});
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/payments", paymentRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
