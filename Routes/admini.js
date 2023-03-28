const admin = require('../model/admin');
const player = require('../model/player');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const router = new express.Router();
const auth = require('../Auth/adminauth')
router.use(cors());
router.post('/admin/setuser',(req,res)=>{
    console.log("Set user")
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let na = {
        name: name,
        email: email,
        password: password,
    }
    na = new admin(na);
    na.save().then((result) => {
        res.send({"message":"User is set","user": result});
    }).catch((err) => {
        res.status(400).send({"error":"User set is failed"});
    });
})
router.get('/admin/login',(req,res)=>{
    console.log("Login User")
    let email = req.body.email;
    let password = req.body.password;
    admin.findOne({email: email})
    .then((v)=>{
        if(v.password==password){
        let currToken = jwt.sign({"_id": v._id},"admintkn");
        v.tokens = v.tokens.concat({token: currToken})
        admin.findByIdAndUpdate(v._id,{tokens: v.tokens}).then((v)=>{
            console.log("here")
            return res.send({"message":"Login done!", "token":currToken});
        }).catch((err)=>{
            res.status(400).send({"error":"Db is down"});
        })
         
        }
        else
        res.send({"message":"Incorrect pwd"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Db is down"});
    })
})

router.get('/admin/logout',auth,(req,res)=>{
    console.log("here at logout")
    console.log(req.id)
    admin.findByIdAndUpdate(req.id,{tokens:[]})
    .then((v)=>{
        console.log(v)
        res.send({"message":"Logout Done!"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Logout failed!"})
    })

})

router.post('/admin/setplayer',auth,(req,res)=>{
    console.log("setting Player")
    const np = new player(
    {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        height:req.body.height,
        weight:req.body.weight,
    }
    )
    player.findOne({email:req.body.email}).then((v)=>{
        if(v)
        res.send({"message":"player already exist"})
        else
        np.save()
        .then((nv)=>{
        return res.send({"player": nv})
    })
    .catch((err)=>{
        return res.status(400).send({"error":"Player set failed"});
    })
    })
    
})
router.get('/admin/playerlist',auth,(req,res)=>{
    player.find()
    .then((v)=>{
        res.send(v);
    })
    .catch((err)=>{
        res.status(400).send({"error":"Something went wrong!"});
    })
})
module.exports = router;