const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    datetime : {
        type: Date,//CHECK if this works
        required: true
    },
    type : {
        type: String,
        required : true
    },
    status : {
        type: String,
        required : true
    }
});

const shoppinglistSchema = new mongoose.Schema({
    quantity : {
        type: Number,
        required: true,
        min: 1,
        max: 999
    },
    totalprice : {
        type: Number,
        required: true
    },
    product_id : {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : String,        
    password : {
        type : String,
        required : true
    },
    DOB : Date,
    type : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    events : [eventSchema]
    /*shoppinglists : [shoppinglistSchema] MOVED TO ORDERS*/
});

/*const productcatSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
});*/
const orderSchema = new mongoose.Schema({
    datetime : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    country : String,
    phone : String,
    email : {
        type : String,
        required : true
    },
    user_id : {
        type : String,
        required : true
    },
    total : Number,
    taxes : Number,
    cityAddress : String,
    companyName : String,
    firstName : String,
    lastName : String, 
    postalCode : String,
    streetAddress : String,
    provinceAddress : String,
    shoppinglists : [shoppinglistSchema]
});

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    picture : {
        type : String,
        required : true
    },
    basePrice : {
        type: Number,
        required : true
    },
    category : {
        type: String,
        required : true
    },
    quantity : {
        type: Number,
        required : true
    }
});

mongoose.model('User', userSchema);
//mongoose.model('Productcat', productcatSchema);
mongoose.model('Order', orderSchema);
mongoose.model('Product', productSchema);