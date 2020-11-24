import * as express from "express";
import controller from "./controller/controller";
import auth from "./middleware/auth"
const router = express.Router();

router.get("/user/:id",controller.getuser)  //for profile
router.post("/register", controller.register) // to register 
router.post("/login", controller.login) // to login 
router.post("/order",auth, controller.makeUserInvoice) //the user make order
router.get("/receiveorder", controller.receiveInvoice) // the library receive it 

export default router;