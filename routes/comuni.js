import express from "express";
import {getComuni, getClientiAssegnati} from '../controllers/comuniController.js'
const router = express.Router({mergeParams: true})

router.get("/", getComuni)
router.get("/clienti", getClientiAssegnati)

export default router