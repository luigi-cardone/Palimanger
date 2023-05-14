import express from "express";
import getPls from '../controllers/plsController.js'
const router = express.Router({mergeParams: true})

router.get("/", getPls)

export default router