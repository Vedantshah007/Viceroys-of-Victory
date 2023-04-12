const express = require('express')
const router = new express.Router();
const cors = require('cors');
const admin = require('../model/admin');
const player = require('../model/player');
const cmatch = require('../model/Cricket/match');
const fmatch = require('../model/Football/fmatch')
const bmatch = require('../model/Badminton/match');
const auth = require('../Auth/adminauth')
router.use(cors());

router.get('/view/players',auth,async (req,res)=>{
    try {
        let players = await player.find({},'name email');
        if(players){
        res.status(200).send(players);
        }
        else
        res.status(400).send({"error":"No players found"})
        
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":"Something went wrong"})
    }
})

router.get('/view/players/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
    player.findById(uid,'name email gender height weight cricket badminton football')
    .then((v)=>{
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Player fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Player fetch failed1"});
    })

})

router.get('/view/players/badminton/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
    bmatch.find({pid:uid},'tot s1 s2 oname wt')
    .then((v)=>{
        console.log(v)
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Badminton fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Badminton fetch failed1"});
    })

})

router.get('/view/players/football/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
    fmatch.find({pid:uid},'tot t1 t2 s1 s2 wt goal')
    .then((v)=>{
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Football fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"football fetch failed1"});
    })

})

router.get('/view/players/cricket/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
    cmatch.find({pid:uid},'tot t1 t2 s1 s2 wt run wicket')
    .then((v)=>{
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Cricket fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Cricket fetch failed1"});
    })

})

module.exports = router;