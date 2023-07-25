const mongoose = require('mongoose');
const validator = require('validator');

const tprofile = mongoose.model('tprofile',{

    pid:{
        //player id
        type: String,
        require: true
    },
    mw:{
        //runs made by pid
        type: Number,
        require: true,
        default: 0
    }
})
module.exports = tprofile;