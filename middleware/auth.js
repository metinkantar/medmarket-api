const jwt = require("jsonwebtoken");
const User = require("../models/User");
const MeKaErrorResponse = require("../helpers/meka_error-response");

const MeKaVerifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next( new MeKaErrorResponse("Bu rotaya erişim yetkiniz yok!", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return next( new MeKaErrorResponse("Bu ID'ye sahip kullanıcı bulunamadı!", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next( new MeKaErrorResponse("Bu rotaya erişim yetkiniz yok", 401));
  }
};

const verifyTokenAndAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new MeKaErrorResponse("Bu rotaya erişim yetkiniz yok!", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new MeKaErrorResponse("Bu ID'ye sahip kullanıcı bulunamadı!", 401));
    }
    req.user = user;
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Bunu işlemi yapmana izin verilmiyor!");
    }
  } catch (error) {
    return next(new MeKaErrorResponse("Bu rotaya erişim yetkiniz yok", 401));
  }
  /*   
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  }); */
};

module.exports = { MeKaVerifyToken, verifyTokenAndAdmin };
/* 




const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
}; */