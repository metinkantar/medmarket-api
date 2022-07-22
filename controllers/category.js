const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

/**************** KATEGORİLER ****************/

//! TÜM KATEGORİLERİ LİSTELEME
exports.allCategory = async (req, res) => {
  const category = await Category.find();
  try {
    if (category) {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
//! KATEGORİ EKLEME
exports.addCategory = async (req, res) => {
  const { title, desc, img } = req.body;
  const newCategory = new Category({
    title,
    desc,
    img,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};
//! KATEGORİ GÜNCELLEME
exports.updateCategory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Güncellenecek veriler boş bırakılamaz!",
    });
  }
  const id = req.params.id;
  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `id=${id}'li Kategori güncellenemedi veya Kategori bulunamadı`,
        });
      } else {
        res.status(200).json({ message: "Kategori başarılya güncellendi" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `id= ${id}'li Kategori güncellenirken bir hata oluştu`, //"Error updating Tutorial with id=" + id
      });
    });
};
//! KATEGORİ SİLME
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: "Category Silme İşlemi Başarılı",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

/**************** ALT KATEGORİLER ****************/

//! TÜM ALT KATEGORİLERİ LİSTELEME
exports.allSubCategory = async (req, res) => {
  const subCategory = await SubCategory.find();
  try {
    if (subCategory) {
      res.status(200).json(subCategory);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
//! BİR KATEGORİYE AİT TÜM ALT KATEGORİLERİ LİSTELEME
exports.allSubcategoriesOfTheCategory = async (req, res) => {
  const { id } = req.params;
  //const subCategory = await SubCategory.find().select('name category').populate('category').find({category: id});
  const subCategory = await SubCategoryfind({ category: id });
  try {
    if (subCategory) {
      res.status(200).json(subCategory);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
//! ALT KATEGORİ EKLEME
exports.addSubCategory = async (req, res) => {
  const { name, category } = req.body;
  const newSubCategory = new SubCategory({
    name,
    category,
  });
  try {
    const savedSubCategory = await newSubCategory.save();
    res.status(200).json(savedSubCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};
//! ALT KATEGORİ GÜNCELLEME
exports.updateSubCategory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Güncellenecek veriler boş bırakılamaz!",
    });
  }
  const id = req.params.id;
  SubCategory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `id=${id}'li Alt Kategori güncellenemedi veya Alt Kategori bulunamadı`,
        });
      } else {
        res.status(200).json({ message: "Alt Kategori başarılya güncellendi" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `id= ${id}'li Alt Kategori güncellenirken bir hata oluştu`, //"Error updating Tutorial with id=" + id
      });
    });
};
//! ALT KATEGORİ SİLME
exports.deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: "Alt Kategori Silme İşlemi Başarılı",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
