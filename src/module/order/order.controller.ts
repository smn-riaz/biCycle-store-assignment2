import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validaton';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;

    const zodParsedData = orderValidationSchema.parse(orderInfo);

    const result = await orderService.createOrder(zodParsedData);
  

    if (result === null) {
      res.status(500).send({
        message: 'Your requested quantity exceeds our stock.',
        success: false,
        error: 'Inputed quantity is more than stock',
      });
    } else if (result === 'STOCKOUT') {
      res.status(500).send({
        message: 'The product is out of stock',
        success: false,
        error:
          'The requested quantity is not available for the selected product. ',
      });
    } else if (result === 'WRONGID') {
      res.status(404).send({
        message: 'Product is not found.',
        success: false,
        error: 'Your product id does not match with our products',
      });
    } else if (result) {
      res.status(200).send({
        message: 'Order created successfully',
        success: true,
        data: result,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message:error.issues[0].message || error.message || "An error occured",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.calculateRevenue();

    res.status(200).send({
     message: "Revenue calculated successfully",
  status: true,
  data: result[0]
    });


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(500).send({
      message:error.issues[0].message || error.message || "An error occured",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const orderController = {
  calculateRevenue,
  createOrder,
};
