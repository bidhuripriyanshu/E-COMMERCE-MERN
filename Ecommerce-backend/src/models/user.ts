import mongoose from "mongoose";
import validator from "validator"

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    //   Virtual Attribute
    age: number;  
}


const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "please enter ID"],

    },
    name: {
        type: String,
        required: [true, "please enter Name"],

    },
    email: {
        type: String,
        unique: [true, "Email Already Exist"],
        required: [true, "please enter email"],
        validate: validator.default.isEmail,  //remember this line of code
    },
    photo: {
        type: String,
        required: [true, "please add Photo"],

    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "please enter Gender"],

    },
    dob: {
        type: Date,
        required: [true, "please enter Date of birth"],

    },
}, { timestamps: true })



// virtual attribute

userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
        age--;
    }

    return age;
});



export const User = mongoose.model<IUser>("User", userSchema)