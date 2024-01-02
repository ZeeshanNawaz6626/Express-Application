const mongoose = require('mongoose');
const productSchema=new  mongoose.Schema({

    name: {
        type: String,
        required: false,
      },
      age: {
        type: String,
        required: true,
       
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      },
    
   
    image: {
        type:String,
        required: false,
    
    },
    createdby: {
     
       type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required:false
      }
    
    
});

module.exports= mongoose.model("products",productSchema);



    