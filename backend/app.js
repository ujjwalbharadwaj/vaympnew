const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin: ['https://vaympnew-bry9.vercel.app'],
  credentials: true
}));

// app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
const admin = require("./controller/admin");
const notification = require("./controller/notification");

app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/admin", admin);
app.use("/api/v2/notification", notification);

// it's for ErrorHandling
// app.use(ErrorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging purposes

  if (err.code === 'ENOTFOUND') {
    // Handle specific MongoDB connection error
    err.message = 'Connection error. Please check your internet or try again later.';
    err.statusCode = 500;
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Connection error. Please check your internet or try again later.' : err.message;

  res.status(statusCode).json({
    success: false,
    message: message,
    field: err.field || null,
  });
});


module.exports = app;






