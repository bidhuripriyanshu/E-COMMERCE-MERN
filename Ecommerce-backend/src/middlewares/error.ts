import { NextFunction,Request,Response } from "express";
import ErrorHandler from "../utils/utility-class.js"

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
  
