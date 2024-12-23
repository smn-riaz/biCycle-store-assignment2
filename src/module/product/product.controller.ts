import { Request, Response } from "express";
import { productService } from "./product.service";
import productValidationSchema from "./product.validation";


const createBicycle = async (req:Request, res:Response) => {
    try {
        const cycleInfo = req.body

        const zodParsedData = productValidationSchema.parse(cycleInfo)

        const result = await productService.createBicycle(zodParsedData)

        res.status(200).send({
            message:"Bicycle created successfully",
            success:true,
            data:result
        })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.status(500).send({
            message:error.issues[0].message || error.message || "An error occured",
            success:false,
            error,
            stack:error.stack
        })
    }
}


const getAllBicycle = async(req:Request, res:Response) => {
    try {
       
        const searchTerm: string | undefined = req.query.searchTerm as string;

        const retrivedProducts = await productService.getAllBicycles(searchTerm)
   

       if(retrivedProducts.length>0) {
        res.status(200).send({
            message:"Bicycle retrieved successfully",
            success:true,
            data: retrivedProducts
        })
       } else{
        res.status(404).send({
            message:"Bicycles are not found",
            success:false,
            error:"Wrong query or something else"
           
        })
       }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.status(500).send({
            message:error.issues[0].message || error.message || "An error occured",
            success:false,
            error,
            stack:error.stack
        })
    }
}


const getSpecificBicycle = async(req:Request, res:Response) => {
    try {
        const {productId} = req.params
       
        const retrivedProduct = await productService.getSpecificBicycle(productId)
      

       if (retrivedProduct) {
        res.status(200).send({
            message:"Bicycle retrieved successfully",
            success:true,
            data: retrivedProduct
        }) 
       } else if (!retrivedProduct){
        res.status(404).send({
            message:"Bicyle is not found",
            success:false,
            error:"Wrong id or something else",

        })
       }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.status(500).send({
            message:error.issues[0].message || error.message || "An error occured",
            success:false,
            error,
            stack:error.stack
        })

    }
}


const updateBicycle = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updateInfo = req.body;

        const updatedProduct = await productService.updateBicycle(productId, updateInfo);

        if (updatedProduct) {
            res.status(200).send({
                message: "Bicycle updated successfully",
                success: true,
                data: updatedProduct,
            });
        } else {
            res.status(404).send({
                message: "Bicycle is not found to update",
                success: false,
                error: "Wrong id or something else",
            });
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        
        res.status(500).send({
            message:  error.issues[0].message || error.message || "An error occured",
            success:false,
            error,
            stack:error.stack
        });
    }
};


const deleteBicycle = async(req:Request, res:Response) => {
    try {
        const {productId} = req.params

  const deletedProduct = await productService.deleteBicycle(productId)

   if(deletedProduct){
    res.status(200).send({
        message:"Bicycle deleted successfully",
        success:true,
        data: {}
    })
   } else {
    res.status(404).send({
        message: "Bycycle is not found to delete",
        success: false,
        error: "Wrong id or something else",
    });
   }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
     res.status(500).send({
        message:error.issues[0].message || error.message || "An error occured",
        success:false,
        error,
        stack:error.stack
     })   
    }

    
}



export const productController = {
    createBicycle, getSpecificBicycle, updateBicycle, deleteBicycle, getAllBicycle
}