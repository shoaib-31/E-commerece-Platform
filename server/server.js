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

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
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
