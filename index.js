const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const flash = require("express-flash");
const nocache = require("nocache");
const session = require("express-session");
const userroutes = require("./routes/userroutes");
const adminroutes = require("./routes/adminroutes");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/E-commerce", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up view engine and static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Routes
app.use("/admin", adminroutes);
app.use("/", userroutes);

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).render('user/error-404');
});

// General error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
