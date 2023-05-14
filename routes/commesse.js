import express from "express";
import getCommesse from '../controllers/commesseController.js'
const router = express.Router({mergeParams: true})

router.get("/", getCommesse)

export default router