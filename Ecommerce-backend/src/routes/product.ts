import  express  from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getlatestProducts, newProduct,getAllCategories, getSingleProduct, updateProduct, deleteProduct,getAllProducts } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//Create New Product -/api/v1/product/new
app.post("/new",adminOnly,singleUpload ,newProduct)
app.post("/all",getAllProducts);

app.post("/latest",getlatestProducts);
app.post("/categories",getAllCategories);
app.post("/admin-products-",adminOnly,getlatestProducts); //admin route

app.route("/:id").
get(getSingleProduct)
.put(singleUpload,updateProduct)
.delete(deleteProduct)


export default app;
