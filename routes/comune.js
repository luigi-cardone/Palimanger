import express from "express";
import {createComune, updateComune} from '../controllers/comuneController.js'
const router = express.Router({mergeParams: true})

router.post("/", createComune)
router.post("/updateComune", updateComune)

export default router