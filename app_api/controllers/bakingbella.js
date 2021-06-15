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
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            password = req.body.password;
            DOB = req.body.DOB;
            type = req.body.type;

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

module.exports = {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    getProductCat,
    getSingleProductCat,
    createProductCat,
    getProduct,
    getSingleProduct,
    createProduct
}