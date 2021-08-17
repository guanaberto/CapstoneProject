const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

const mainCtrl = require('../controllers/bakingbella');
router.route('/users').get(mainCtrl.getUser).post(mainCtrl.createUser);
router.route('/users/:userid').get(mainCtrl.getSingleUserById).put(mainCtrl.updateUser).delete(mainCtrl.deleteUser);
router.route('/users/:username/:passwd').get(mainCtrl.getSingleUser);

router.route('/products/').get(mainCtrl.getProduct).post(mainCtrl.createProduct);
router.route('/products/:prodid').get(mainCtrl.getSingleProduct).put(mainCtrl.updateProduct).delete(mainCtrl.deleteProduct);

/*router.route('/productcats/').get(mainCtrl.getProductCat).post(mainCtrl.createProductCat);
router.route('/productcats/:prodcatid').get(mainCtrl.getSingleProductCat).put(mainCtrl.updateProductCat).delete(mainCtrl.deleteProductCat);*/

router.route('/orders/').get(mainCtrl.getOrder).post(mainCtrl.createOrder);
router.route('/orders/:orderid').get(mainCtrl.getSingleOrder).put(mainCtrl.updateOrder).delete(mainCtrl.deleteOrder);
router.route('/ordersuser/:userid').get(mainCtrl.getOrderByUser);

router.route('/users/:userid/events').post(mainCtrl.createEvent);
router.route('/users/:userid/events/:eventid').get(mainCtrl.getSingleEvent).delete(mainCtrl.deleteEvent).put(mainCtrl.updateEvent);

router.route('/orders/:orderid/shoppinglists').post(mainCtrl.createShoppingList);
router.route('/orders/:orderid/shoppinglists/:shoplistid').get(mainCtrl.getSingleShoppingList).delete(mainCtrl.deleteShoppingList).put(mainCtrl.updateShoppingList);
 
//Email
const emailCtrl = require('../controllers/email');
router.route('/email/:to/:subject/:body*').get(emailCtrl.sendEmail);

module.exports = router;