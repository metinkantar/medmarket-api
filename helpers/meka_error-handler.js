const MeKaErrorResponse = require('./meka_error-response');

const MeKaErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.code === 11000) {
    const message = `Yinelenen Alan Değeri Girin`;
    error = new MeKaErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new MeKaErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Bağlantı Hatası",
  });
};

module.exports = MeKaErrorHandler;
