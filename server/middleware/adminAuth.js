module.exports = function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return res.status(500).json({ success: false, error: 'Server misconfigured: ADMIN_TOKEN not set' });
  }
  const header = req.header('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  if (token !== expected) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  next();
};
