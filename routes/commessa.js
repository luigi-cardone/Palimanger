import express from "express";
import {getCommessa, createCommessa, updateCommessa} from '../controllers/commessaController.js'
const router = express.Router({mergeParams: true})

router.get("/commessa/:commessa_id", getCommessa)

router.post("/createCommessa", createCommessa)

router.post("/updateCommessa", updateCommessa)

export default router