import express from "express";
import {getUserBioData, updateUserBioData, deleteUser} from '../controllers/userContoller.js'
const router = express.Router({mergeParams: true})

router.get("/user/:user_id", getUserBioData)

router.post("/updateUser", updateUserBioData)

router.delete("/deleteUser:userData", deleteUser)

export default router