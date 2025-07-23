import { NextFunction,Request,Response } from "express";
import ErrorHandler from "../utils/utility-class.js"
import { ControllerType } from "../types/types.js";

export const errorMiddleware =(
    err:ErrorHandler , 
    req:Request , 
    res:Response ,
    next:NextFunction
) =>
 {

      err.message ||="Internal server";
      err.statusCode ||= 500 ;

      return res.status(400).json({
         success:true,
         message: err.message 
      });
  }
  

  
  export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
