sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ ...user._doc, token });
};

module.exports = { sendToken };


//res.status(statusCode).json({ islem: true, ...userInformation, token });