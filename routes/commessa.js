import express from "express";
import {getCommessa, createCommessa, updateCommessa, getCommessaUsers, updateCommessaUsers, deleteCommessaUser} from '../controllers/commessaController.js'
const router = express.Router({mergeParams: true})

router.get("/commessa/:commessa_id", getCommessa)

router.get("/getCommessaUsers/:commessa_id", getCommessaUsers)

router.post("/createCommessa", createCommessa)

router.post("/updateCommessa", updateCommessa)

router.post("/updateCommessaUsers", updateCommessaUsers)

router.post("/deleteCommessaUser/:user_id", deleteCommessaUser)


export default router