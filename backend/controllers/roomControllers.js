const Room=require('../models/room');

module.exports.fetchRooms=async(req,res)=>{
     let rooms;
        try{
        rooms=await Room.find({}).populate('speakers')
        .populate('ownerId')
        .exec();
        }catch(err){
          return res.status(401).json({message:'Something Went wrong'});
        }
     return res.json({rooms});

}

module.exports.createRooms=async(req,res)=>{
  const {topic,type}=req.body;

    
  if(!topic || !type){
    return res.status(400).json({message:'All fields are required'});
  }
    try{
    const room=await new Room({
       topic,
       roomType:type,
       ownerId:req.user._id, 
      speakers:[req.user._id]
    }).save();
    return res.json({room});    
}catch(err){
    return res.status(500).json({message:'something went wrong'});
}
}