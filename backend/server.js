const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("../backend/routes/userRoute");
const productRoute = require("../backend/routes/productRoute");
const errorHandler = require("../backend/middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", ""],
    credentials: true,
  })
);

//router middlewares
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;
//Error middleware
app.use(errorHandler);
//connect do db and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Hello from port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
