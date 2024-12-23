import Product from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderInfo: TOrder) => {
  const findInStock = await Product.findOne({ _id: orderInfo.product }).select({
    quantity: 1,
    _id: 0,
  });

  if (findInStock?.quantity) {
    const afterOrderProduct = await Product.findOneAndUpdate(
      { _id: orderInfo.product, quantity: { $gte: orderInfo.quantity } },
      [
        {
          $set: {
            quantity: { $subtract: ['$quantity', orderInfo.quantity] },
            inStock: {
              $gt: [{ $subtract: ['$quantity', orderInfo.quantity] }, 0],
            },
          },
        },
      ],
      { new: true },
    );

    if (afterOrderProduct) {
      const result = await Order.create(orderInfo);
      return result;
    } else return afterOrderProduct;
  } else if (!findInStock) return 'WRONGID';
  else return 'STOCKOUT';
};

const calculateRevenue = async () => {
  const totalRevenue = await Order.aggregate([
    {
  
        // pipeline - 1
       
          // stage - 1
            $project: {
              productId: { $toObjectId: '$product' },
              quantity: 1,
            },
          },
          // stage - 2
          {
            $lookup: {
              from: 'products',
              localField: 'productId',
              foreignField: '_id',
              as: 'revenueHisab',
            },
          },

          // stage - 3
          {
            $project: {
              _id: 0,
              orderProductId: '$productId',
              orderQuantity: '$quantity',
              productPrice: { $arrayElemAt: ['$revenueHisab.price', 0] },
            },
          },

        // stage - 4
          {
            $group: { _id: "$orderProductId", totalOrderQuantity: { $sum: "$orderQuantity" }, productPrice:{$first:"$productPrice"} },
          },

          // stage - 5
          {
            $project:{_id:0,orderProductId:"$_id", 
            totalOrderQuantity:1, productPrice:1,  
            totalPrice: { $multiply: ["$totalOrderQuantity", "$productPrice"]}
          }
          },
          // stage - 6
          {
            $group:{_id:null, totalRevenue:{$sum:"$totalPrice"}}
          },

          // stage - 7
          {
            $project:{totalRevenue:1, _id:0}
          }
        ],
    );

return totalRevenue
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
