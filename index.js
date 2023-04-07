const express = require('express');
const app =express();
const dotenv = require('dotenv');
dotenv.config();
require('./Db/mongoose')
const bdp = require('body-parser');
const port = process.env.PORT||3000;
const admin = require('./model/admin');
const player = require('./model/player');
const addi = require('./Routes/admini');
const playeri = require('./Routes/playeri')
const playeric = require('./Routes/playeric')
const playerib = require('./Routes/playerib')
const views = require('./Routes/view')
const { default: mongoose } = require('mongoose');
const fire = require('./Db/mongoose');




app.use(express.json());
app.use((req,res,next)=>{
    if(mongoose.connection.readyState==2||mongoose.connection.readyState==0){
    fire();
    next();
    }
    else
    next();
})
app.use(playerib);
app.use(playeric);
app.use(playeri);
app.use(addi);
app.use(views);

app.listen(port,()=>{
    fire();
    console.log("app is running at "+port);
})

