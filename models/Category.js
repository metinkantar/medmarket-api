const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
    collection: "categories"
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;