const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

const mainCtrl = require('../controllers/bakingbella');
router.route('/users').get(mainCtrl.getUser).post(mainCtrl.createUser);
router.route('/users/:userid').get(mainCtrl.getSingleUser).put(mainCtrl.updateUser).delete(mainCtrl.deleteUser);

router.route('/products/').get(mainCtrl.getProduct).post(mainCtrl.createProduct);
router.route('/products/:prodid').get(mainCtrl.getSingleProduct).put(mainCtrl.updateProduct).delete(mainCtrl.deleteProduct);

router.route('/productcats/').get(mainCtrl.getProductCat).post(mainCtrl.createProductCat);
router.route('/productcats/:prodcatid').get(mainCtrl.getSingleProductCat).put(mainCtrl.updateProductCat).delete(mainCtrl.deleteProductCat);

router.route('/users/:userid/events').post(mainCtrl.createEvent);
router.route('/users/:userid/events/:eventid').get(mainCtrl.getSingleEvent).delete(mainCtrl.deleteEvent);

router.route('/users/:userid/shoppinglists').post(mainCtrl.createShoppingList);
router.route('/users/:userid/shoppinglists/:shoplistid').get(mainCtrl.getSingleShoppingList).delete(mainCtrl.deleteShoppingList);


module.exports = router;