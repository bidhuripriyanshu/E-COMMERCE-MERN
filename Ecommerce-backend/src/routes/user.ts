import  express  from "express";
import { newUser,getUser ,getAllUsers, deleteUser} from "../controllers/user.js";
const app =express.Router();
import { adminOnly } from "../middlewares/auth.js";





// importing Routes
// route -/api/v1/user/new
app.post("/new",newUser);






//Route-/api/v1/user/all
app.get("/all",adminOnly,getAllUsers)




//Routes -/api/v1/users/dynamicID
app.route("/:id").get(getUser).delete(adminOnly,deleteUser);



export default app;