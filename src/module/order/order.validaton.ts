import { z } from "zod";

export const orderValidationSchema = z.object({
    email: z.string().email(),
    product: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"), 
    quantity: z.number().int().positive("Quantity must be a positive integer"), 
    totalPrice: z.number().positive("Total price must be positive"), 
  });

