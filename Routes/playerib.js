const express = require('express')
const router = new express.Router();
const player = require('../model/player');
const admin = require('../model/admin');
const bmatch = require('../model/Badminton/match');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const auth = require('../Auth/playerauth')
dotenv.config();


router.post('/player/badminton/addmatch',auth,(req,res)=>{
    console.log("Add badminton Match");
    if(req.body.oid==req.studentid)
    return res.send({"error":"Invalid Opponent id"})
    let match = {
        tot: req.body.tot,
        pid: req.id,
        oname: req.body.oname,
        oid: req.body.oid,
        s1: req.body.s1,
        s2: req.body.s2,
        wt: req.body.wt,
    }
    player.findOne({studentid: req.body.oid})
    .then((eo)=>{
        if(eo){
        match = new bmatch(match);
        match.save()
        .then((v)=>{
            let omatch = {
                tot: req.body.tot,
                pid: eo._id,
                oname: req.name,
                oid: req.studentid,
                s1: req.body.s2,
                s2: req.body.s1,
                wt: !req.body.wt,
            }
            omatch = new bmatch(omatch);
            omatch.save()
            .then((os)=>{
                if(os)
                res.status(200).send({"message":"BMatch Set"});
                else
                res.status(400).send({"error":"BMatch set failed"})
            })
            .catch((err)=>{
                console.log(err);
                res.send({"error":"BMatch set failed"})
            })
            
        })
        .catch((err)=>{
            res.send({"error":"BMatch set failed"})
        })
}
else
res.send({"error":"Invalid Opponent id"});
})
    
})

module.exports = router;