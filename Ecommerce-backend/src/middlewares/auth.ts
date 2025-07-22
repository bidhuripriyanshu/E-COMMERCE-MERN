import ErrorHnadler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import {User} from "../models/user.js"

export const adminOnly = TryCatch(async(req, res ,next)=>{
   
  const {id}= req.query;
  if(!id) return next(new ErrorHnadler("saale login kr pahle tu",401))

  const user = await User.findById(id);
  if(!user) return next(new ErrorHnadler("saale fake id deta hai",401))
  
  if(user.role !=="admin") 
    return next(new ErrorHnadler("saale fake id deta hai",401))
   

  next();





})