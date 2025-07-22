import  express  from "express";
import { newUser,getUser ,getAllUsers, deleteUser} from "../controllers/user.js";
const app =express.Router();


// importing Routes
// route -/api/v1/user/new
app.post("/new",newUser);


//Route-/api/v1/user/all
app.get("/all",getAllUsers)


//Routes -/api/v1/users/dynamicID
app.route("/:id").get(getUser).delete(deleteUser);

export default app;