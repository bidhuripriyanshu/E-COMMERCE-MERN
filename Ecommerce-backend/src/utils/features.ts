import mongoose from "mongoose"
// import { InvalidateCacheProps } from "../types/types.js";

export const connectDB =()=>{
    mongoose.connect("mongodb://localhost:27017",{
       dbName:"Ecommerce_24", 

    }).then(c=>console.log(`DB Connect to ${c.connection.host}`))
}


export const invalidateCache = async ({
    product,
    order,
    admin,
  }: InvalidateCacheProps) => {
    
  
    if (product) {
      const productKeys: string[] = [
        "latest-products",
        "categories",
        "all-products",
      ];
  
       
    }
    if (order) {
      const ordersKeys: string[] = [
        "all-orders",
        `my-orders-${userId}`,
        `order-${orderId}`,
      ];
  
      await redis.del(ordersKeys);
    }
    if (admin) {
      await redis.del([
        "admin-stats",
        "admin-pie-charts",
        "admin-bar-charts",
        "admin-line-charts",
      ]);
    }
  };