/* Modules */
import express from "express";
import cors from "cors"
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
/* Cofig and middleware */
import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./middleware/verify.js";
import credentials from "./middleware/credentials.js";
/* Routes */
import register from './routes/register.js'
import login from './routes/login.js'
import refresh from './routes/refresh.js'
import logout from './routes/logout.js'
import users from './routes/users.js'
import user from './routes/user.js'
import commessa from './routes/commessa.js'
import commesse from './routes/commesse.js'
import areeTerritoriali from './routes/areeTerritoriali.js'
import areaTerritoriale from './routes/areaTerritoriale.js'
import comuni from './routes/comuni.js'
import comune from './routes/comune.js'
import clienti from './routes/clienti.js'
import cliente from './routes/cliente.js'
import fornitori from './routes/fornitori.js'
import fornitore from './routes/fornitore.js'
import voci from './routes/voci.js'
import pl from './routes/pl.js'
import pls from './routes/pls.js'
import webfiles from './routes/webfiles.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(express.json())
app.use(credentials)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static(path.join(__dirname + "/public")))
app.use('/register', register)
app.use('/login', login)
app.use('/refresh', refresh)
app.use('/logout', logout)
// app.use(verifyJWT)
app.use('/users', users)
app.use('/user', user)
app.use('/commessa', commessa)
app.use('/commesse', commesse)
app.use('/areeTerritoriali', areeTerritoriali)
app.use('/areaTerritoriale', areaTerritoriale)
app.use('/comuni', comuni)
app.use('/comune', comune)
app.use('/clienti', clienti)
app.use('/cliente', cliente)
app.use('/voci', voci)
app.use('/pl', pl)
app.use('/pls', pls)
app.use('/fornitori', fornitori)
app.use('/fornitore', fornitore)
app.use('/webfiles', webfiles)
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Backend started")
})