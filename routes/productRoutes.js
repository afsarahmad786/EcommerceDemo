const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', authMiddleware, getProducts);
router.post('/', authMiddleware, roleMiddleware('admin'), upload.single('image'), createProduct);
router.put('/:id', authMiddleware, roleMiddleware('admin'), upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProduct);

module.exports = router;
