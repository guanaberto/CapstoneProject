const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/bakingbella');
router.route('/users').get(ctrlUser.getUser).post(ctrlUser.createUser);
router.route('/users/:userid').get(ctrlUser.getSingleUser).put(ctrlUser.updateUser);

router.route('/products/').get(ctrlUser.getProduct).post(ctrlUser.createProduct);
router.route('/products/:prodid').get(ctrlUser.getSingleProduct);

router.route('/productcats/').get(ctrlUser.getProductCat).post(ctrlUser.createProductCat);
router.route('/productcats/:prodcatid').get(ctrlUser.getSingleProductCat);

module.exports = router;