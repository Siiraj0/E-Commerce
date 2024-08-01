const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const flash = require("express-flash");
const morgan = require("morgan");
const nocache = require("nocache");
const session = require("express-session");
const userroutes = require("./routes/userroutes");
// const usercontoller = require("./controllers/usercontroller");
mongoose.connect("mongodb://127.0.0.1:27017/E-commerce");

const adminroutes = require("./routes/adminroutes");
// app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache());

app.use(express.json());
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use("/", userroutes);
app.use("/admin", adminroutes);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
