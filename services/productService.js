const Product = require('../models/Product');

const createProduct = async (title, description, price, image) => {
  const product = await Product.create({ title, description, price, image });
  return product;
};

const getAllProducts = async () => {
  return await Product.find();
};

const updateProduct = async (id, updates) => {
  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) throw new Error('Product not found');
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error('Product not found');
  return product;
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct };
