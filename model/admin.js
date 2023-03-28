const mongoose = require('mongoose')

const validator = require('validator')
const admin = mongoose.model('admin',{
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
            else{
                var ind=value.indexOf("@");
                var my_slice=value.slice(ind+1);
                if(!(my_slice==="iiitvadodara.ac.in")&&!(my_slice==="iiitv.ac.in")){   
                throw new Error('Invalid Email')
                }
            }
        }
    },
    password:{
        type: String,
        require: true
    },
    tokens:[
        {
           token:{
            type: String
            }
        }
    ]
})

module.exports = admin;