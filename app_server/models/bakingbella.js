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
        type: String,//check if this one works
        required: true
    }
});

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
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
    events : [eventSchema],
    shoppinglists : [shoppinglistSchema]
});

const productcatSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
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
mongoose.model('Productcat', productcatSchema);
mongoose.model('Product', productSchema);