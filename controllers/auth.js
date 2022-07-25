const { sendToken } = require("../helpers/functions");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const MeKaErrorResponse = require("../helpers/meka_error-response");

exports.getAll = async (req, res) => {
  res.status(200).json({
    status: true,
    method: "GET",
    data: "MedMarket Auth Api",
    auth: "Yetki Yok",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new MeKaErrorResponse("Lütfen e-posta ve şifre girin."), 400);
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new MeKaErrorResponse("Geçersiz giriş bilgileri", 401));
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new MeKaErrorResponse("Geçersiz giriş bilgileri", 401));
    }
    //const token = user.getSignedToken();
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE }
    );
    /*  const token = jwt.sign({
       _id: user._id,
       isAdmin: user.isAdmin
     }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRE,
     }); */

    res.status(200).json({ _id: user._doc._id, email: user._doc.email, username: user._doc.username, isAdmin: user._doc.isAdmin, token });

    //sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ islem: false, hata: error.message });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new MeKaErrorResponse("E-posta sıfırlama isteği gönderilemedi!")
      );
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `http://localhost:5000/sifresifirlama/${resetToken}`;
    const message = `
      <h1>Şifre sıfırlama talebinde bulundunuz.</h1>
      <p>Şifrenizi sıfırlamak için lütfen bu bağlantıya gidin</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      /*  let transporter = nodemailer.createTransport({
         host: "smtp.sendgrid.net",
         port: 587 || 25,
         secure: false,
         requireTLC: true,
         auth: {
           user: "apikey",
           pass: "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",
         },
         tls: {
           // do not fail on invalid certs
           rejectUnauthorized: false,
         },
       }); 
 
       await transporter.sendMail({
         to: user.email,
         from: "turksinerji@gmail.com",
         subject: "Şifre sıfırlama isteği",
         text: "Şifre Sıfırlama İsteği Gönderildi",
         html: message,
       });
 */
      /*  await sendEmail({
        to: user.email,
        subject: "Şifre sıfırlama isteği",
        text: message,
      }); */
      res.status(200).json({
        islem: true,
        data: "E-posta gönderildi",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return next(new MeKaErrorResponse("E-posta gönderilemedi!"), 500);
    }
  } catch (error) {
    next(error);
  }
};

exports.sifreSifirla = (req, res) => {
  res.send("Reset Password Route");
};
