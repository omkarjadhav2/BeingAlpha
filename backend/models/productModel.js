import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name : {type : String , required : true},
    description  : {type : String , required : true },
    brand :  {type : String , required : true },
    prevprice: {type : Number , required : true},
    newprice : {type : Number , required : true},
    material : {type : String , required : true },
    color : {type : String , required : true },
    stock : { type : Number , required : true},
    image : { type : Array , required : true},
    category :  {type : String , required : true },
    subCategory : {type : String , required : true },
    sizes : { type : Array , required : true},
    bestseller : {type : Boolean },
    date : { type : Number , required : true},

}, { timestamps: true });

const productModel = mongoose.model.product || mongoose.model("product" , productSchema);

export default productModel;
