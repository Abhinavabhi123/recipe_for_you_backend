const express = require("express");
const app = express();
const db = require('./db')

require('dotenv').config()

db.dbConnect(cb=>{
    if(cb){
        console.log('db running..');
        return
    }
    console.log('error connection db')
})



app.listen(process.env.PORT||4000,()=>console.log(`server is running in Port ${process.env.PORT}...`))
