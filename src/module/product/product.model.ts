import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
name:{
    type:String,
    required:[true, "Please provide the name of the Bi-Cycle"]
},
brand:{type:String, required:[true, "Please provide the brand of the Bi-Cycle"]},
price:{type:Number, required:[true, "Please provide the price (number) of the Bi-Cycle"], 
    validate: {
        validator: function (value) {
          return (typeof value === 'number' && value > 0);
        },
        message: "{VALUE} is not a valid price. Price must be greater than 0"
      }
},
type:{type:String, enum:{
    values:["Mountain", "Road", "Hybrid", "BMX", "Electric"],
    message:"{VALUE} is not matched with our types. Please, follow our types (Mountain, Road, Hybrid, BMX, Electric)"

}},
description:{type:String, required:[true, "Please provide a brief description of the bicycle"]},

quantity:{type:Number, required:[true, "Please provide the quantity of the bicycle available"]},
inStock: {type:Boolean,required:[true, "Please ensure inStock or not by giving true/false"]}



}, {
    timestamps:true
})



const Product = model<TProduct>("Product", productSchema)

export default Product