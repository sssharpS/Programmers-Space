const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    phone:{
        type:String,required:true
    },
    isActivate:{
        type:Boolean,required:true,default:"false"
    },
    name:{
        type:String,default:""
    },
    avatar:{
        type:String,default:""
    }
},{
    timestamps:true
});


const User=mongoose.model('User',userSchema);

module.exports=User;