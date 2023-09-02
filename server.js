const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models/db");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
