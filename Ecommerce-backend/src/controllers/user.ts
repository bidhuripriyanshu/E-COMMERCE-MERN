import { Request, NextFunction, Response } from "express";
import { User } from '../models/user.js';
import { newUserRequestBody } from "../types/types.js";
import ErrorHandler from '../utils/utility-class.js'
import { TryCatch } from "../middlewares/error.js";



export const newUser = TryCatch(
    async (
        req: Request<{}, {}, newUserRequestBody>,
        res: Response,
        next: NextFunction


    ) => {


        const { name, email, gender, dob, photo, _id } = req.body;
        
        let user= await User.findById(_id);
        if(user)
             return res.status(200).json({
                success:true,
                message:` Welcome,${user.name}`,
            })

        if(!name|| !email|| !gender|| !dob || !photo||!_id){
            return next(new ErrorHandler("Please add all field",400))
        }    


        // console.log(name, email, gender, dob, photo, _id)
        user = await User.create({
            name,
            email,
            gender,
            photo,
            _id,
            dob: new Date(dob),
        })


        return res.status(201).json({
            success: true,
            message: `Welcome,${user.name}`,
        })
    }
)

export const getUser=TryCatch(async(req,res,next)=>{
    
const users = await User.find({});

return res.status(200).json({
    success: true,
    users,
})

})



export const getAllUsers=TryCatch(async(req,res,next)=>{
    const id = req.params.id;
    const user = await User.find({id});
    

    if(!user) return next(new ErrorHandler("Invalid Id",400));
    return res.status(200).json({
        success: true,
        message:"user Deleted Successfully",
    })
    
    })


    
export const deleteUser=TryCatch(async(req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
    }
    

    if(!user) return next(new ErrorHandler("Invalid Id",400));

   

    return res.status(200).json({
        success: true,
        message:"User Deleted Success",
    })
    
    })