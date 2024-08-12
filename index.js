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
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use("/admin", adminroutes);
app.use("/", userroutes);

app.use((err, res, next) => {
  res.status(404).render('user/error-404');
});

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
