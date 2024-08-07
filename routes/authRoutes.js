const express = require('express');
const router = express.Router();
const { register, login,logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Serve Login and Register Pages
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

// Register and Login API Endpoints
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard', { email: req.user.email });
});

module.exports = router;
