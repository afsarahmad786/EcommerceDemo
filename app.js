const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const session = require('express-session');
const cors=require('cors')
require('dotenv').config();

const app = express();
app.use(cors())

app.use(session({
  secret: 'secretadmali123456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, expires: 600000  } // Use true in production with HTTPS
}));

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

// Middleware to set user in locals for views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
