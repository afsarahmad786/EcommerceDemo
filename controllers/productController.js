const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../services/productService');

exports.getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.render('products', { products });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { title, description, price } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const product = await createProduct(title, description, price, image);
    console.log('products',product)
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (req.file) updates.image = req.file.path;
  try {
    const product = await updateProduct(id, updates);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
