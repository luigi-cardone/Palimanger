import express from "express";
import {getUserBioData, updateUserBioData, deleteUser, createAdmin} from '../controllers/userContoller.js'
const router = express.Router({mergeParams: true})

router.get("/user/:user_id", getUserBioData)

router.post("/updateUser", updateUserBioData)

router.post("/createAdmin", createAdmin)

router.delete("/deleteUser:userData", deleteUser)

export default router