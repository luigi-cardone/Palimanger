import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use('/img_commesse', express.static(path.join(__dirname, "../webfiles/immagini_commesse")))

export default router