const mongoose=require('mongoose');

const refreshSchema=new mongoose.Schema({
    token:{
        type:String,required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' //refer User table or model
    }
},{
    timestamps:true
});

const Refresh=mongoose.model('Refresh',refreshSchema);

module.exports=Refresh;

