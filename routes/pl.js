import express from "express";
import {getPl, createPl, updateTorrefaro, getTorrefaro} from '../controllers/plController.js'
import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../webfiles/immagini_commesse/"))
    },
    filename: function (req, file, cb) {
      cb(null, `${req.body.dati_generali.commessa_cod}_${req.body.pl_id}_${file.fieldname.split("[")[1].replace("]", "")}${path.extname(file.originalname)}`)
    }
  })
  
const upload = multer({ storage: storage });
const router = express.Router({mergeParams: true})

router.get("/", getPl)

router.post("/createPl", createPl)

router.post("/updateTorreFaro", upload.any(),  updateTorrefaro)

router.get("/getTorreFaro/:pl_id", getTorrefaro)


export default router