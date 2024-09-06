import express from "express";

import{
    getAllUsers,
    getUserDetails,
    register,
    specialFunc,
    updateUser,
    deleteUser
} from "../controllers/user.js";


const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new",register);

router.get("/userid/special", specialFunc);

router
.route("/userid/:id")
.get(getUserDetails)
.put(updateUser)
.delete(deleteUser);

export default router;