import { TryCatch } from "../middlewares/error.js";
import { Request } from "express";
import { NewProductRequestBody, SearchRequestQuery, BaseQuery } from "../types/types.js"
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs"
import { myCache } from "../app.js";



export const newProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  if (!photo) return next(new ErrorHandler("please add Photo", 400))

  if (!name || !price || !stock || !category) {
    rm(photo.path, () => {
      console.log("Deleted");
    })
  }

  await Product.create({
    name,
    price,
    stock,
    category: category.toLowerCase(),
    photo: photo.path
  })

  return res.status(201).json({
    success: true,
    message: "Product Created Successfully",
  });
})


//Revalidate on New ,update,delete product & on new order
export const getlatestProducts = TryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("latest-product"))
    products = JSON.parse(myCache.get("latest-product") as string);
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-product", JSON.stringify(product));
  }
  return res.status(201).json({
    success: true,
    products,
  });



})



export const getAllCategories = TryCatch(async (req, res, next) => {

  let categories;
  if (myCache.has("categories"))
    categories = JSON.parse(myCache.get("latest-product") as string);
  else {
    categories = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-product", JSON.stringify(categories));

    return res.status(201).json({
      success: true,
      categories,
    });
  })


export const getAdminProducts = TryCatch(async (req, res, next) => {

   let products;
  if (myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-product") as string);
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("all-products", JSON.stringify(products));
  }



  return res.status(201).json({
    success: true,
    products,
  });



})


export const getSingleProduct = TryCatch(async (req, res, next) => {

  const product = await Product.findById(req.params.id);




  return res.status(201).json({
    success: true,
    product,
  });



})


export const updateProduct = TryCatch(async (req, res, next) => {

  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Invalid Product", 400));

  if (photo) {
    rm(product.photo!, () => {
      console.log("Old Photo Deleted");
    })
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();


  return res.status(201).json({
    success: true,
    message: "Product Created Successfully",
  });
})


export const deleteProduct = TryCatch(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("product Not Found", 400));

  rm(product.photo!, () => {
    console.log("Product Photo Deleted");
  })


  await Product.deleteOne()
  return res.status(201).json({
    success: true,
    message: "Product Deleted Successfully",
  });



})


export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {


  const { search, sort, category, price } = req.query;


  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PER_PAGEB || 8);

  const skip = (page - 1) * limit;
  const baseQuery: BaseQuery = {};

  if (search)
    baseQuery.name = {
      $regex: search,
      $options: "i",
    };

  if (price)
    baseQuery.price = {
      $lte: Number(price),
    };

  if (category) baseQuery.category = category;





  const productsPromise = Product.find(baseQuery)
    .sort(sort && { price: sort === "asc" ? 1 : -1 })
    .limit(limit)
    .skip(skip);

  const [products, filteredOnlyProduct] = await Promise.all([
    productsPromise,
    Product.find(baseQuery),
  ]);


  const totalPage = Math.ceil(filteredOnlyProduct.length / limit);




  return res.status(201).json({
    success: true,
    products,
  });



})



// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\5ba9bd91-b89c-40c2-bb8a-66703408f986.png",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };

// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };