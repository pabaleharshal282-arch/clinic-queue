/**
 * Auth Controller - Simple admin login (hardcoded credentials)
 * Purpose: Validate admin login for protected admin routes
 */

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const login = (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return res.json({ success: true, message: 'Login successful' });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { login };
