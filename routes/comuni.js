import express from "express";
import getComuni from '../controllers/comuniController.js'
const router = express.Router({mergeParams: true})

router.get("/", getComuni)

export default router