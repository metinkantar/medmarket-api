const Product = require("../models/Product");

//! TÜM ÜRÜNLERİ LİSTELEME İŞLEMİ
exports.getAllProduct = async (req, res) => {
  const product = await Product.find();
  //product.length == 0 ? res.status(200).json({ message: "Ürün Sayısı : 0" }) : null;
  try {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Ürün bulunamadı" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
  //product && res.status(200).json(product);
};

//! TEK ÜRÜN GETİRME 
exports.getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }

}

//! ÜRÜN LİMİT
exports.getLimitProduct = async (req, res) => {
  const { limit } = req.params;
  const product = await Product.find().limit(limit);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Ürün bulunamadı" });
  }
}

//! ÜRÜN EKLEME İŞLEMİ
exports.addProduct = async (req, res) => {
  const { title, desc, img, categories, size, color, price, inStock } = req.body;
  const newProduct = new Product({
    title,
    desc,
    img,
    categories,
    size,
    color,
    price,
    inStock,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//! ÜRÜN SİLME İŞLEMİ
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: "Ürün Silme İşlemi Başarılı"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


