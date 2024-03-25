const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.CONNECTION);
  console.log("successfully connected to database");

}

module.exports=mongoose;

