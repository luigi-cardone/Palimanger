import express from "express";
import {createFornitore, updateFornitore} from '../controllers/fornitoreController.js'
const router = express.Router({mergeParams: true})

router.post("/", createFornitore)
router.post("/updateFornitore", updateFornitore)

export default router