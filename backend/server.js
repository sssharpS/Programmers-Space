const express = require("express");
const app = express();
//we need server of nodejs and pass express in this now express also working at this server
const server = require("http").createServer(app);
require("dotenv").config();
const port = 5500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path=require('path');


app.use('/assets', express.static('assets'));
app.use(cookieParser());

const corOptions = {
  credentials: true, //send cookie at server side
  origin: ["http://localhost:3000"],
};

app.use(cors(corOptions));

const mongoose = require("./config/mongoose");
//  mongoose.main();

app.use(express.json({limit:'5mb'}));

// routes middleware
app.use("/", require("./routes/auth"));

module.exports=server;
require('./socket');

// here we are using api's of express for listening the reqests but now we use nodejs server
app.get('/',(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
})
server.listen(port, () => {
  console.log(`server is running and listen at port:${port}`);
});


