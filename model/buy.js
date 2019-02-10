const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const buySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    price:{ type : Number, required :true },
    quantity : { type : Number,required : true},
    sell : { type :mongoose.Schema.Types.ObjectId, ref :'Sell'},
    date : {type : Date,default : Date.now}
   
});
module.exports = mongoose.model('Buy',buySchema); 