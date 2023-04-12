const mongoose = require('mongoose');
const validator = require('validator');

const fprofile = mongoose.model('fprofile',{

    pid:{
        //player id
        type: String,
        require: true
    },
    goal:{
        //runs made by pid
        type: Number,
        require: true,
        default: 0
    }
})
module.exports = fprofile;