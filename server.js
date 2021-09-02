const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
