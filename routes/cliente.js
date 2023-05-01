import express from "express";
import {createCliente, updateCliente} from '../controllers/clienteController.js'
const router = express.Router({mergeParams: true})

router.post("/", createCliente)
router.post("/updateCliente", updateCliente)

export default router