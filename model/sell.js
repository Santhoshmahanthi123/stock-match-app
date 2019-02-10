const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const sellSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    price:{ type : Number, required :true },
    quantity : { type : Number,required : true},
    buy : { type :mongoose.Schema.Types.ObjectId, ref :'Buy'},
    date : {type : Date,default : Date.now}

   
});
module.exports = mongoose.model('Sell',sellSchema); 