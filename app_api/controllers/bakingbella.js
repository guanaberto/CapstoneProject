const mongoose = require('mongoose');

const User = mongoose.model('User');
const ProductCat = mongoose.model('Productcat');
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

const getSingleUser = function(req,res){
    const userid = req.params.userid;
    User.findById(userid)
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    "message" : "User not found"+userid
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
        type : req.body.type          
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

//TODO add Event and shopping lists creator here


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
        category : req.body.category 
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
                    "message" : "Product not found"+prodid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(prod);
        });
};

const getProductCat = function(req,res){
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
};

module.exports = {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductCat,
    getSingleProductCat,
    createProductCat,
    updateProductCat,
    deleteProductCat
}