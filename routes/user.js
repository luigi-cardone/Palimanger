import express from "express";
import {getUserBioData, updateUserBioData, deleteUser, createUser} from '../controllers/userContoller.js'
const router = express.Router({mergeParams: true})

router.get("/user/:user_id", getUserBioData)

router.post("/updateUser", updateUserBioData)

router.post("/createUser", createUser)

router.delete("/deleteUser:userData", deleteUser)

export default router