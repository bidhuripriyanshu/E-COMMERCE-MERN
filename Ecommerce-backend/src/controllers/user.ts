import { Request, NextFunction, Response } from "express";
import { User } from '../models/user.js';
import { newUserRequestBody } from "../types/types.js";
import ErrorHandler from '../utils/utility-class.js'

export const newUser = async (req: Request<{}, {}, newUserRequestBody>
    , res: Response, next: NextFunction) => {
    try {
       return next(new ErrorHandler ("mera Error"));
        const { name, email, gender, dob, photo, _id } = req.body;
        console.log(name, email, gender, dob, photo, _id)
        const user = await User.create({
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
    catch (error) {
        return res.status(400).json({
            success: true,
            message: error,
        })

    }
}