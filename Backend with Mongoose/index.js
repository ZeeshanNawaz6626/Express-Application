const express = require('express');
require("./config");
const cors = require('cors')
const Product = require('./product');
const User = require('./User');
const multer  = require('multer')
const path = require('path');
const fs = require("fs");
const product = require('./product');
const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const app = express();

app.use(express.json());
app.use(cors());

// for getting image

app.use('/data', express.static(path.join(__dirname,'uploads')))



// for posting image 


const upload = multer({ storage: multer.diskStorage(
  {
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 }).single('upload')


app.get("/list",
authenticateToken,
 async (req, resp) => {
  
try{ 
  
  let data = await Product.find({createdby: req.user.tok.userid });
    // let data = await Product.find({createdby: new ObjectId(req.user.tok.userid)});
    resp.send(data);
}
 catch(e){
      console.log(e);
    }
})

app.delete("/delete/:_id",authenticateToken, async(req, resp) => {
  try{
    // console.log('del',req.params)
    const filepath =await product.findOne({_id:req.params})
    console.log(filepath);
    fs.unlink("./uploads/" + filepath.image,(err)=>{
        // console.log("deleted");
    })
    let data = await Product.deleteOne(req.params);
     
    resp.send(data);
  }
   catch(e){
      console.log(e);
    }


})

app.get('/product/:productid', async (req, res) => {
  try {
    const productid = req.params.productid;

    // Find the user by ID in the "Product" collection
    const product = await Product.findById(productid);

    if (!product) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put("/update/:_id",async (req, resp) => {
  try{
    // console.log(req.params)
    let data = await Product.updateOne(
      { _id: req.params._id },
        {$set: req.body
        }
    );
    resp.send(data);
    }
    catch(e){
      console.log(e);
    }
})





// User API

app.post("/signup", async (req, resp) => {
  try{
    const { name,email, password } = req.body;
    if (!name ||!email || !password) {
      return resp.status(400).json({ error: 'Name,Email and password are required' });
    }
  
    let data = new User(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
          
           
        }
        
        );
    const result = await data.save();
    resp.send(result);
} 
catch(error){
    resp.send("invalid credential");
}
 
})
app.post('/signin',async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      var user = await User.findOne({ email });

      // console.log("users",password,user);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      if (!password==user.password) {
        return res.status(401).json({ error: 'Email and password did not match' });
      }
      const tok = {
        userid: user._id,
        email: email,
        password: password,
      };
      const token = jwt.sign({ tok }, secretKey, { expiresIn: '1h' });
      // console.log(user);
      res.json({ message: 'successful',token,user });
    // console.log(tok.userid);
   
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post("/create",
  authenticateToken,
  upload, 
  async(req, resp) => {
      // let filepath = `http://localhost:5000/data/${req.file.filename}`
  try{
      let data = new Product(
          {
              name:req.body.name,
              age:req.body.age,
              email:req.body.email,
            
              // file name with routing
              // if you want  only file you write
              image:req.file.filename,
              createdby:req.user.tok.userid 
              // req.user._id            
          }
          );
  
          // console.log("ye walal data",user);
      const result = await data.save();
      resp.send(result);
      }
      catch(e){
        console.log(e);
      }
  });
  
  function authenticateToken(req, res, next) {
      const token = req.header('Authorization');
  try{
    if (!token) return res.sendStatus(401).send("Token not found");
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403).send("There is an error");
  // console.log('log in',user);
      req.user = user;
    
      // console.log('auth2' ,req.user);
      next();
    });
  }
  catch (error) {
    console.log(`Authentication error: ${error.message}`);
    res.sendStatus(401).send("Authentication failed");
}
   
  }


  app.get('/user', authenticateToken, (req, res) => {
    const userId = req.user.userId;
   res.send(userId)
  });
  app.listen(5000 ,()=>{
    console.log("run");
})

app.put("/updateform/:_id",
 upload,
  async (req, resp) => {
  try{
    // console.log(req.params)
    let data = {
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
          
            // file name with routing
            // if you want  only file you write
            image:req.file.filename,
            // createdby:req.user.tok.userid 
            // req.user._id            
        };
        console.log("yy",data);
        let updatedata = await Product.updateOne(
          { _id: req.params._id },
            {$set: data
            }
        );
        // console.log("ye walal data",updatedata);
   
    resp.send(updatedata);
    }
    catch(e){
      console.log(e);
    }
})