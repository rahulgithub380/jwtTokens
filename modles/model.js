const mongoose = require('mongoose');
const validator = require('validator')
const scheema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phoneNo:{
        type:Number,
        maxlength:10,
        minlength:10,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    token: {
        type:String,
        default:null
    }

});

const Modles = mongoose.model('all-details',scheema);

module.exports={Modles}
