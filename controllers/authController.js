const { registerUser, loginUser } = require('../services/authService');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const token = await registerUser(email, password, role);
    req.session.token = token; 
    req.session.user = { email, role };
    res.json({ message: 'Registration successful' });
    } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [token,user] = await loginUser(email, password);
    req.session.token = token; 
    req.session.user = { email: user.email, role: user.role };

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};