const mongoose = require('mongoose');
const { Schema } = mongoose;


const subCategorySchema = Schema({
  name: {
      type: String,
      required: true,
      unique: true,
  },
  category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required:true
  },
},
{
  timestamps: true,
  collection: "subCategories"
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;