const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models/db");
const bodyParser = require("body-parser");
const productRoute = require("./routers/productRouter");
const userRoute = require("./routers/userRouter");
const orderRoute = require("./routers/orderRouter");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();

app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
