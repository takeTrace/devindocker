exports.authLogin = (req, res, next) => {
  const user = req.session.user;
  if (!user)
    return res.status(403).json({ status: 'fail', message: 'need login'});
  next();
}
