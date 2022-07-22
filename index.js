require('dotenv').config({ path: "config.env" });
const Express = require("express");
const app = Express();
const MeKaErrorHandler = require("./helpers/meka_error-handler");
const cors = require("cors");

//MongoDB Bağlantısı
const dbBaglanti = require("./config/db");
dbBaglanti(); 

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cors());


// Auth Route Middleware
app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));
app.use("/api/category", require("./routes/category"));

app.route("/").get((req, res) => {
  res.send("<center><b>Merhaba Dünya :D</b></center>");
  
});


//Error Handler
app.use(MeKaErrorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numaralı port bağlantı noktasında çalışıyor...`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`Kayıtlı Hata: ${err}`);
  server.close(() => process.exit(1));
})