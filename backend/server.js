const express = require('express');
const app=express();
require('dotenv').config();
const port=5500;
 const cors = require('cors');
 const cookieParser= require('cookie-parser');
 
 app.use(cookieParser());


 const corOptions={
    credentials:true,//send cookie at server side
    origin:['http://localhost:3000'],
 }

 app.use(cors(corOptions));
 const mongoose= require('./config/mongoose');
//  mongoose.main();



app.use(express.json());






// routes middleware
app.use('/',require('./routes/auth'));




app.listen(port,()=>{
    console.log(`server is running and listen at port:${port}`);
})


