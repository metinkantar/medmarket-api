const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: false
    },
    /* 
      categories: { 
        type: Schema.Types.ObjectId, 
        ref: 'Cagetory'
      },
    */
    size: { type: Array },
    color: { type: Array },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: "products" }
);

module.exports = mongoose.model("Product", ProductSchema);
