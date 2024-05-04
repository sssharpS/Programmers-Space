const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    
    topic:{
      type:String,required:true
    },
    roomType:{
      type:String,required:true
    },
    ownerId:{
        type:mongoose.SchemaTypes.ObjectId,ref:'User',
    },

    speakers:{
        type:[
            {type:mongoose.SchemaTypes.ObjectId,
              ref:'User',
            }
        ],
        required:false
    }

},{timestamps:true});


const Room=mongoose.model('Room',roomSchema);
module.exports=Room;