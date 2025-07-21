exports.adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: 'Contact administrator' });
};