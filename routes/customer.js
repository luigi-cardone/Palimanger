import express from "express";
import {createCliente, updateCliente} from '../controllers/customerController.js'
const router = express.Router({mergeParams: true})

router.post("/", createCliente)
router.post("/updateCliente", updateCliente)

export default router