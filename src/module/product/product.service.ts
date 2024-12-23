import { TProduct } from "./product.interface";
import Product from "./product.model";

const createBicycle = async(cycleInfo:TProduct) => {
    const result = await Product.create(cycleInfo)
    return result
}


const getAllBicycles = async(query:string) => {
    
    const result = await Product.find({$or:[{name:{ $regex: query, $options: 'i' }},{brand:{ $regex: query, $options: 'i' }},{type:{ $regex: query, $options: 'i' }}]})

    return result
}


const getSpecificBicycle = async(id:string) => {
    const result = await Product.findById(id)
   
     return result
    
}


const updateBicycle = async(id:string,cycleInfo:Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(id, cycleInfo,{ new: true } )
    return result
}


const deleteBicycle = async(id:string) => {
    const result = await Product.findByIdAndDelete(id)
    return result
}





export const productService = {
    createBicycle, getAllBicycles, getSpecificBicycle,updateBicycle, deleteBicycle
}