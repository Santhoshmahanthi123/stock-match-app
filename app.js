const express = require('express');
const app = express();
const ejs = require('ejs');
const User = require('./model/user')
const Buy = require('./model/buy')
const Sell = require('./model/sell')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/stock',{useNewUrlParser: true})
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('home')
});
app.get('/user',(req,res)=>{
    res.render('user')
})
app.post('/user',(req,res)=>{
    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email,
    });
    user
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message :'User created!'
        })
    })
    res.render('home')
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
app.get('/buy',(req,res)=>{
    res.render('buy')
})
app.get('/display',(req,res)=>{
    res.render('display')
})
app.get('/match',(req,res)=>{
    res.render('match')
})
app.post('/buy',(req,res)=>{
  const buy = new Buy({
    _id : new mongoose.Types.ObjectId(),
    price : req.body.price,
    quantity : req.body.quantity,

  })
  buy
    .save()
    .then(result =>{
        console.log(result);
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
    res.render('home')
})
app.get('/sell',(req,res)=>{
    res.render('sell')
})
app.post('/sell',(req,res)=>{
    const sell = new Sell({
      _id : new mongoose.Types.ObjectId(),
      price : req.body.price,
      quantity : req.body.quantity,
  
    })
    sell
      .save()
      .then(result =>{
          console.log(result);
        //   res.status(201).json({
        //       message :'Post created for selling'
        //   })
      })
      .catch(err =>{
          console.log(err);
          res.status(500).json({
              error : err
          });
      });
      res.render('home')
  })
app.post('/match',(req,res)=>{
    Buy.findById(req.body.id)
    .select('_id price quantity date')
    .sort({price:-1})
    .exec()
    .then(buy=>{
        // var buying=buy;
        Sell.find()
        .select('_id price quantity date')
        .sort({price:-1})  
        .exec()
        .then(sell=>{
        // res.status(200).json({message:'selling result',result});
        let mappedSell=sell.filter((item)=>{
            return item.price <= buy.price
        })
        console.log(`sellers mapped result:`,mappedSell);
        let unmappedSell=sell.filter((item)=>{
            return item.price >= buy.price
        })
        // res.json({'sorted unmapped sellers list':unmappedSell})
        console.log(`Not matched sellers result:`,unmappedSell);
        // res.json({'Matched sellers':mappedSell,'Not matched sellers result':unmappedSell})
        res.render('display',{mapped:mappedSell,unmapped:unmappedSell})
        }) 
        
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err,
            });
        });

    })
    
    .catch(err => {console.log(err);
        res.status(500).json({
            error : err
        });
        
    });
   
})
app.listen(port,()=>{
    console.log(`app started on port:${port}`)
});