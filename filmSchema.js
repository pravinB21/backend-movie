var mongoose=require('mongoose');
const { stringify } = require('qs');

var filmSchema=new mongoose.Schema({
    name:{type:String,required:true},
    boxOfficeCollection:{type:Number,required:true},
    rating:{type:Number,required:true},
    director:{type:String,required:true}
})

var filmModel=mongoose.model('ReactFilmsData',filmSchema);

module.exports=filmModel;