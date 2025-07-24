import { TryCatch } from "../middlewares/error.js";
import { Request } from "express";
import {NewProductRequestBody,SearchRequestQuery} from "../types/types.js"
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import {rm} from "fs"



export const newProduct  =TryCatch(async (req:Request<{},{},NewProductRequestBody> ,res,next)=>{
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    
    if(!photo) return next(new ErrorHandler("please add Photo",400))
    
    if(!name|| !price || !stock||!category){
        rm(photo.path,()=>{
           console.log("Deleted");
        })
    }
    
    await Product.create({
      name,
      price,
      stock,
      category:category.toLowerCase(),
      photo:photo.path
    })

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
})

export const getlatestProducts =TryCatch(async (req,res,next)=>{
  
  const products = await Product.find({}).sort({createdAt:-1}).limit(5);
 



  return res.status(201).json({
    success: true,
    products,
  });



})

export const getAllCategories =TryCatch(async (req ,res,next)=>{
  
   const categories = await Product.distinct("category")
  
  
    return res.status(201).json({
    success: true,
    categories ,
  });



})


export const getAdminProducts =TryCatch(async (req ,res,next)=>{
  
  const products = await Product.find({})
 



  return res.status(201).json({
    success: true,
    products,
  });



})

export const getSingleProduct =TryCatch(async (req ,res,next)=>{
  
  const product = await Product.findById(req.params.id);
  


  
  return res.status(201).json({
    success: true,
    product,
  });



})


export const updateProduct  =TryCatch(async (req ,res,next)=>{
  
  const {id} = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if(!product) return next(new ErrorHandler("Invalid Product",400));
  
  if(photo){
      rm(product.photo!, ()=>{
         console.log("Old Photo Deleted");
      })
      product.photo= photo.path;
  }

  if(name) product.name = name;
  if(price) product.price = price;
  if (stock) product.stock = stock;
  if(category) product.category = category;

  await product.save();
  

  return res.status(201).json({
    success: true,
    message: "Product Created Successfully",
  });
})


export const deleteProduct =TryCatch(async (req ,res,next)=>{
  
  const product = await Product.findById(req.params.id);
  if(!product) return next(new ErrorHandler("product Not Found",400));
  
  rm(product.photo!, ()=>{
    console.log("Product Photo Deleted");
  })


  await Product.deleteOne()
  return res.status(201).json({
    success: true,
    message:"Product Deleted Successfully",
  });



})


export const getAllProducts =TryCatch(async (req:Request<{},{},{},SearchRequestQuery>,res,next)=>{
  const products = await Product.find({}).sort({createdAt:-1}).limit(5);
  const{search,sort,category,price}= req.query;
  const page = Number(req.query.page)||1;
  
 




  return res.status(201).json({
    success: true,
    products,
  });



})
