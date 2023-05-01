import express from "express";
import {getCommessa, createCommessa} from '../controllers/commessaController.js'
const router = express.Router({mergeParams: true})

router.get("/commessa/:commessa_id", getCommessa)

router.post("/createCommessa", createCommessa)

export default router