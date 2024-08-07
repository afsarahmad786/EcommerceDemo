const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct ,getUserProducts} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const cartController = require('../controllers/cartController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', authMiddleware, getProducts);
router.post('/', authMiddleware, roleMiddleware('admin'), upload.single('image'), createProduct);
router.put('/:id', authMiddleware, roleMiddleware('admin'), upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProduct);


// USER Routes
// Route to get all User products
router.get('/allproduct', authMiddleware, getUserProducts);


module.exports = router;
