import z from 'zod'


const productValidationSchema = z.object({
    name: z
    .string({required_error: "Name is required",
        invalid_type_error: "Name must be a string",}),
brand: z
    .string({required_error: "Brand is required",
        invalid_type_error: "Brand must be a string",}),
price: z
    .number({required_error: "Price is required",
        invalid_type_error: "Price must be a number",})
    .positive("Please provide a valid price greater than 0"),
type: z
    .enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"])
    .refine((value) => value ,
        { message: "{VALUE} is not matched with our types. Please, follow our types (Mountain, Road, Hybrid, BMX, Electric)" }
    ),
description: z
    .string({required_error: "Description is required",
        invalid_type_error: "Description must be a string",})
    ,
quantity: z
    .number().min(0, "Quantity may be 0 or more than zero"),
inStock: z
    .boolean(),
}).refine(
    (data) => data.quantity > 0 &&  data.inStock === true,
    {
      message: "If the quantity is greater than 0, inStock will be true; otherwise, it'll be false",
      path: ["inStock", "quantity"], 
    }
  );


export default productValidationSchema