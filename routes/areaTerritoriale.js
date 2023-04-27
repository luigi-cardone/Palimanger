import express from "express";
import {createAreaTerritoriale, updateAreaTerritoriale} from '../controllers/areaTerritorialeController.js'
const router = express.Router({mergeParams: true})

router.post("/", createAreaTerritoriale)
router.post("/updateAreaTerritoriale", updateAreaTerritoriale)

export default router