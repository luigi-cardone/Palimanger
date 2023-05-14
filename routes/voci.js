import express from "express";
import {getVoci, createVoce} from '../controllers/vociController.js'
const router = express.Router({mergeParams: true})

router.get("/", getVoci)

router.post("/createVoce", createVoce)

export default router