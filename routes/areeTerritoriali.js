import express from "express";
import getAreeTerritoriali from '../controllers/areeTerritorialiController.js'
const router = express.Router({mergeParams: true})

router.get("/", getAreeTerritoriali)

export default router