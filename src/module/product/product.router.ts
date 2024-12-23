import { Router } from "express";
import { productController } from "./product.controller";


const productRouter = Router()


productRouter.post('/', productController.createBicycle)
productRouter.get('/', productController.getAllBicycle)
productRouter.get('/:productId', productController.getSpecificBicycle)
productRouter.put('/:productId', productController.updateBicycle)
productRouter.delete('/:productId', productController.deleteBicycle)


export default productRouter