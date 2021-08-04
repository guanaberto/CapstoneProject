const { response } = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');
//const ProductCat = mongoose.model('Productcat');
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');

const getUser = function(req,res){
    User.find().exec(function(err, userdata) {
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(userdata);
    });        
};

const getSingleUserById = function(req,res){
    const userid = req.params.userid;
    User.findById(userid)
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    "message" : "User not found "+userid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(user);
        });
};

const getSingleUser = function(req,res){
    const username = req.params.username;
    const passwd = req.params.passwd;
    //User.findById(userid)
    User.find({username : username, password : passwd})
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    "message" : "User not found"+username
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(user);
        });
};

const createUser = function(req,res){
    User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password,
        DOB : req.body.DOB,
        type : req.body.type,
        username : req.body.username      
    },(err, userdata) => {
        if(err){
            res.status(404).json(err);
            console.log("data received: "+userdata);
            return;
        }else{
            res.status(200).json(userdata);
        }
    }); 
};

const updateUser = function(req,res){
    if (!req.params.userid) {
        return res
            .status(404)
            .json({
                "message": "Not found, userid is required"
            });
    }
    User.findById(req.params.userid)
        .exec((err, user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({
                        "message": "userid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = req.body.password;
            user.DOB = req.body.DOB;
            user.type = req.body.type;
            user.username = req.body.username;

            user.save((err, user) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(user);
                }
            });
        });
};

const deleteUser = function(req,res){
    const { userid } = req.params;
    if (userid) {
        User.findByIdAndRemove(userid)
            .exec((err, user) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                //If user to delete is not found show a custom message
                if(!user){
                    return res.status(404)
                              .json({
                                  "message": "User to delete not found"
                              });
                }
                res.status(204)
                    .json(null);
            }
            );
    } else {
        res.status(404)
            .json({
                "message": "No User found"
            });
    }
};

//Event
const getSingleEvent = function(req,res){
    const { userid, eventid } = req.params;
    if (!userid || !eventid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, userid and eventid are both required' });
    }

    User.findById(userid)
        .select('events')
        .exec((err, user) => {
            if (!user) {
                return res.status(404)
                        .json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(400)
                        .json(err);
            }

            if (user.events && user.events.length > 0) {
                if (!user.events.id(eventid)) {
                    return res.status(404)
                            .json({ 'message': 'Event not found' });
                } else {
                    return res.status(200)
                            .json(user.events.id(eventid));                    
                }
            } else {
                res.status(404)
                   .json({ 'message': 'The User has no Events' });
            }
        });
};

const createEvent = (req, res) => {
    const userId = req.params.userid;
    if (userId) {
        User.findById(userId)
            .select('events')
            .exec((err, user) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {                    
                    const { name, datetime, type, status } = req.body;
                    user.events.push({
                        name,
                        datetime,
                        type,
                        status
                    });
                    console.log(name, datetime, type, status);
                    user.save((err, user) => {
                        if (err) {
                            res
                                .status(400)
                                .json(err);
                        } else {
                            res
                                .status(201)
                                .json(user.events);
                        }
                    });
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "User not found" });
    }
};

const deleteEvent = (req, res) => {
    const { userid, eventid } = req.params;
    if (!userid || !eventid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, userid and eventid are both required' });
    }

    User.findById(userid)
        .select('events')
        .exec((err, user) => {
            if (!user) {
                return res.status(404)
                        .json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(400)
                        .json(err);
            }
                
            if (user.events && user.events.length > 0) {
                if (!user.events.id(eventid)) {
                    return res.status(404)
                            .json({ 'message': 'Event not found' });
                } else {
                    user.events.id(eventid).remove();
                    user.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            return res.status(204)
                                .json({'message' : 'Event deleted successfully'});
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'No Event to delete' });
            }
        });
};

const updateEvent = (req, res) => {
    const { userid, eventid } = req.params;
    if (!userid || !eventid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, userid and eventid are both required' });
    }

    User.findById(userid)
        .select('events')
        .exec((err, user) => {
            if (!user) {
                return res.status(404)
                        .json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(400)
                        .json(err);
            }
                
            if (user.events && user.events.length > 0) {
                if (!user.events.id(eventid)) {
                    return res.status(404)
                            .json({ 'message': 'Event not found' });
                } else {
                    const thisevent = user.events.id(eventid);
                    thisevent.name = req.body.name;
                    thisevent.datetime = req.body.datetime;
                    thisevent.type = req.body.type;
                    thisevent.status = req.body.status;
                    user.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            return res.status(204)
                                .json({'message' : 'Event updated successfully'});
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'No Event to update' });
            }
        });
};

const getSingleShoppingList = function(req,res){
    const { userid, shoplistid } = req.params;
    if (!userid || !shoplistid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, userid and shoplistid are both required' });
    }

    User.findById(userid)
        .select('shoppinglists')
        .exec((err, user) => {
            if (!user) {
                return res.status(404)
                        .json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(400)
                        .json(err);
            }

            if (user.shoppinglists && user.shoppinglists.length > 0) {
                if (!user.shoppinglists.id(shoplistid)) {
                    return res.status(404)
                            .json({ 'message': 'Shopping List not found' });
                } else {
                    return res.status(200)
                            .json(user.shoppinglists.id(shoplistid));                    
                }
            } else {
                res.status(404)
                   .json({ 'message': 'The User has no Shopping Lists' });
            }
        });
};

const createShoppingList = (req, res) => {
    const userId = req.params.userid;
    if (userId) {
        User.findById(userId)
            .select('shoppinglists')
            .exec((err, user) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {                    
                    const { quantity, totalprice, product_id, order_id } = req.body;
                    //check if the product exists
                    Product.exists({_id: product_id}, function(err, doc){
                        if(err){
                            res.status(400)
                                .json({ "message": "Related Product not found" });
                        }else{
                            //HERE THE PUSH
                            user.shoppinglists.push({
                                quantity,
                                totalprice,
                                product_id,
                                order_id
                            });
                            user.save((err, user) => {
                                if (err) {
                                    res
                                        .status(400)
                                        .json(err);
                                } else {
                                    res
                                        .status(201)
                                        .json(user.shoppinglists);
                                }
                            });
                        }
                    }); 
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "User not found" });
    }
};

const deleteShoppingList = (req, res) => {
    const { userid, shoplistid } = req.params;
    if (!userid || !shoplistid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, userid and shoplistid are both required' });
    }

    User.findById(userid)
        .select('shoppinglists')
        .exec((err, user) => {
            if (!user) {
                return res.status(404)
                        .json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(400)
                        .json(err);
            }

            if (user.shoppinglists && user.shoppinglists.length > 0) {
                if (!user.shoppinglists.id(shoplistid)) {
                    return res.status(404)
                            .json({ 'message': 'Shopping List not found' });
                } else {
                    user.shoppinglists.id(shoplistid).remove();
                    user.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            return res.status(204)
                                .json({'message' : 'Shopping List deleted successfully'});
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'No Shopping List to delete' });
            }
        });
};

const updateShoppingList = (req, res) => {
    const { userid, shoplistid } = req.params;
    if (!userid || !shoplistid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, userid and shoplistid are both required' });
    }

    User.findById(userid)
        .select('shoppinglists')
        .exec((err, user) => {
            if (!user) {
                return res.status(404)
                        .json({ 'message': 'User not found' });
            } else if (err) {
                return res.status(400)
                        .json(err);
            }

            if (user.shoppinglists && user.shoppinglists.length > 0) {
                if (!user.shoppinglists.id(shoplistid)) {
                    return res.status(404)
                            .json({ 'message': 'Shopping List not found' });
                } else {

                    Product.exists({_id: req.body.product_id}, function(err, doc){
                        if(err){
                            res.status(400)
                                .json({ "message": "Related Product not found" });
                        }else{
                            const thisshopl = user.shoppinglists.id(shoplistid);
                            thisshopl.quantity = req.body.quantity;
                            thisshopl.totalprice = req.body.totalprice;
                            thisshopl.product_id = req.body.product_id;
                            thisshopl.order_id = req.body.order_id;
                            
                            user.save(err => {
                                if (err) {
                                    return res
                                        .status(404)
                                        .json(err);
                                } else {
                                    return res.status(204)
                                        .json({'message' : 'Shopping List updated successfully'});
                                }
                            });
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'No Shopping List to delete' });
            }
        });
};



const getProduct = function(req,res){
    Product.find().exec(function(err, pdata) {
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(pdata);
    });        
};

const createProduct = function(req,res){
    Product.create({
        name : req.body.name,
        picture : req.body.picture,
        basePrice : req.body.basePrice,
        category : req.body.category,
        quantity : req.body.quantity        
    },(err, productdata) => {
        if(err){
            res.status(404).json(err);
            console.log("data received: "+productdata);
            return;
        }else{
            res.status(200).json(productdata);
        }
    }); 
};

const updateProduct = function(req,res){
    if (!req.params.prodid) {
        return res
            .status(404)
            .json({
                "message": "Not found, prodid is required"
            });
    }
    Product.findById(req.params.prodid)
        .exec((err, prod) => {
            if (!prod) {
                return res
                    .status(404)
                    .json({
                        "message": "prodid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            prod.name = req.body.name;
            prod.picture = req.body.picture;
            prod.basePrice = req.body.basePrice;
            prod.category = req.body.category;
            prod.quantity = req.body.quantity;   
            prod.save((err, prod) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(prod);
                }
            });
        });
};

const deleteProduct = function(req,res){
    const { prodid } = req.params;
    if (prodid) {
        Product.findByIdAndRemove(prodid)
            .exec((err, prod) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                //If product to delete is not found show a custom message
                if(!prod){
                    return res.status(404)
                              .json({
                                  "message": "Product to delete not found"
                              });
                }
                res.status(204)
                    .json(null);
            }
            );
    } else {
        res.status(404)
            .json({
                "message": "No Product found"
            });
    }
};

const getSingleProduct = function(req,res){
    const prodid = req.params.prodid;
    Product.findById(prodid)
        .exec((err, prod) => {
            if(!prod){
                return res.status(404).json({
                    "message" : "Product not found "+prodid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(prod);
        });
};

/*const getProductCat = function(req,res){
    ProductCat.find().exec(function(err, pcdata) {
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(pcdata);
    });        
};

const getSingleProductCat = function(req,res){
    const prodcatid = req.params.prodcatid;
    ProductCat.findById(prodcatid)
        .exec((err, prodcat) => {
            if(!prodcat){
                return res.status(404).json({
                    "message" : "Product Category not found"+prodcatid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(prodcat);
        });
};

const createProductCat = function(req,res){
    ProductCat.create({
        name : req.body.name,        
    },(err, productcatdata) => {
        if(err){
            res.status(404).json(err);
            console.log("data received: "+productcatdata);
            return;
        }else{
            res.status(200).json(productcatdata);
        }
    }); 
};

const updateProductCat = function(req,res){
    if (!req.params.prodcatid) {
        return res
            .status(404)
            .json({
                "message": "Not found, prodcatid is required"
            });
    }
    ProductCat.findById(req.params.prodcatid)
        .exec((err, prodcat) => {
            if (!prodcat) {
                return res
                    .status(404)
                    .json({
                        "message": "prodcatid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            prodcat.name = req.body.name;
            
            prodcat.save((err, prodcat) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(prodcat);
                }
            });
        });
};

const deleteProductCat = function(req,res){
    const { prodcatid } = req.params;
    if (prodcatid) {
        ProductCat.findByIdAndRemove(prodcatid)
            .exec((err, prodcat) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                //If product cat to delete is not found show a custom message
                if(!prodcat){
                    return res.status(404)
                              .json({
                                  "message": "Product Cat to delete not found"
                              });
                }
                res.status(204)
                    .json(null);
            }
            );
    } else {
        res.status(404)
            .json({
                "message": "No Product Cat found"
            });
    }
};*/

const getOrder = function(req,res){
    Order.find().exec(function(err, odata) {
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(odata);
    });        
};

const getSingleOrder = function(req,res){
    const orderid = req.params.orderid;
    Order.findById(orderid)
        .exec((err, order) => {
            if(!order){
                return res.status(404).json({
                    "message" : "Order not found"+orderid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(order);
        });
};

const createOrder = function(req,res){
    Order.create({
        datetime : req.body.datetime,
        status : req.body.status,
        country : req.body.country,
        phone : req.body.phone,
        email : req.body.email,
        total : req.body.total,
        taxes : req.body.taxes,
        cityAddress : req.body.cityAddress,
        companyName : req.body.companyName,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        postalCode : req.body.postalCode,
        streetAddress : req.body.streetAddress
    },(err, odata) => {
        if(err){
            res.status(404).json(err);
            console.log("data received: "+odata);
            return;
        }else{
            res.status(200).json(odata);
        }
    }); 
};

const updateOrder = function(req,res){
    if (!req.params.orderid) {
        return res
            .status(404)
            .json({
                "message": "Not found, orderid is required"
            });
    }
    Order.findById(req.params.orderid)
        .exec((err, order) => {
            if (!order) {
                return res
                    .status(404)
                    .json({
                        "message": "order not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            order.name = req.body.name;            
            order.datetime = req.body.datetime;
            order.status = req.body.status;
            order.country = req.body.country;
            order.phone = req.body.phone;
            order.email = req.body.email;
            order.total = req.body.total;
            order.taxes = req.body.taxes;
            order.cityAddress = req.body.cityAddress;
            order.companyName = req.body.companyName;
            order.firstName = req.body.firstName;
            order.lastName = req.body.lastName;
            order.postalCode = req.body.postalCode;
            order.streetAddress = req.body.streetAddress;

            order.save((err, order) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(order);
                }
            });
        });
};

const deleteOrder = function(req,res){
    const { orderid } = req.params;
    if (orderid) {
        Order.findByIdAndRemove(orderid)
            .exec((err, order) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                //If order to delete is not found show a custom message
                if(!order){
                    return res.status(404)
                              .json({
                                  "message": "Order to delete not found"
                              });
                }
                res.status(204)
                    .json(null);
            }
            );
    } else {
        res.status(404)
            .json({
                "message": "No Order found"
            });
    }
};

module.exports = {
    //User
    getUser,
    getSingleUserById,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    
    //Event
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    
    //ShoppingList
    getSingleShoppingList,
    createShoppingList,
    deleteShoppingList,
    updateShoppingList,
    
    //Product
    getProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    
    //Product Category
    /*getProductCat,
    getSingleProductCat,
    createProductCat,
    updateProductCat,
    deleteProductCat*/
    
    //Order
    getOrder,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder 
}