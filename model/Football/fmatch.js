const mongoose = require('mongoose');

const football_schema = mongoose.Schema({
    tot:{
        type:String,
        required:true
    },
    t1:{
        type:String,
        required:true
    },
    t2:{
        type:String,
        required:true
    },
    s1:{
        type:Number,
        required:true,
        default:0
    },
    s2:{
        type:Number,
        required:true,
        default:0
    },
    pid:{
        type:String,
        required:true
    },
    wt:{
        type:Boolean,
        required:true
    },
    goal:{
        type:Number,
        required:true,
        default:0
    }
})

const fmatch = mongoose.model('fmatch',football_schema);
module.exports = fmatch;