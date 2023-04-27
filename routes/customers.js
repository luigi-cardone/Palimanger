import express from "express";
import getCustomers from '../controllers/customersController.js'
const router = express.Router({mergeParams: true})

router.get("/", getCustomers)

export default router