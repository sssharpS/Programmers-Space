const express = require('express');
const app=express();
require('dotenv').config();
const port=5500;
 const cors = require('cors');
 app.use(cors());
 const mongoose= require('./config/mongoose');
//  mongoose.main();



app.use(express.json());






// routes middleware
app.use('/',require('./routes/auth'));




app.listen(port,()=>{
    console.log(`server is running and listen at port:${port}`);
})


