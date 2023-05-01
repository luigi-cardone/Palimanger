import express from "express";
import getFornitori from '../controllers/fornitoriController.js'
const router = express.Router({mergeParams: true})

router.get("/", getFornitori)

export default router