import { model, Schema } from "mongoose"
import { TOrder } from "./order.interface"

const orderSchema = new Schema<TOrder>({
  email:{
    type:String,
    required:[true, "Please, provide your email"],
      message:"{VALUE} is not a valid email",

  }  ,
  product:{
    type:String,
    required:true
  },
  quantity:{type:Number, required:[true, "Please enter the quantity"], 
    validate: {
        validator: function (value) {
          return (typeof value === 'number' && value > 0);
        },
        message: "{VALUE} is not a valid quantity. Quantity must be greater than 0"
      }
},

totalPrice:{type:Number, required:[true, "Please enter the total price"], 
    validate: {
        validator: function (value) {
          return (typeof value === 'number' && value > 0);
        },
        message: "{VALUE} is not a valid price. Price must be greater than 0"
      }
},

}, {timestamps:true})


export const Order = model<TOrder>("Order", orderSchema)

