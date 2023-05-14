import db from '../config/dataBaseOptions.js'

const getPl = (req, res) =>{
    const pl_id = req.params.pl_id
    const q = "SELECT * FROM punti_luce pl WHERE pl.pl_id = ?"
    db.query(q, [pl_id], (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        return res.json(data)
    })
}
const createPl = (req, res) =>{
    const {nome, indirizzo, impianto, targhetta, latitudine, longitudine, materiale, anzianita, altezza, tipologia_palo, tipo_verifica_palo, indicazioni, note, commessa_cod, commessa_id} = req.body
    var q = "INSERT INTO `punti_luce`(`nome`, `indirizzo`, `impianto`, `targhetta`, `latitudine`, `longitudine`, `materiale`, `anzianita`, `altezza`, `tipologia_palo`, `tipo_verifica_palo`, `indicazioni`, `note`, `commessa_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, ?, ?)"
    db.query(q, [nome, indirizzo, impianto, targhetta, latitudine, longitudine, materiale, anzianita, altezza, tipologia_palo, tipo_verifica_palo, indicazioni, note, commessa_id], (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        const pl_id = data.insertId
        q = "INSERT INTO `torri_faro`(`pl_id`) VALUES (?)"
            db.query(q, [pl_id], (err, data)=>{
                if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
                return res.json({'error' : false, 'message' : 'Punto luce creato con successo'})
            })
        }
    )}

const updateTorrefaro = (req, res) =>{
    const commessa_img_file_path = "webfiles/img_commesse/"
    const {pl_id, dati_generali, visual_testing, ultrasonic_testing, magnetic_testing, verifica_strutturale, voci, note, verifica_rettilineita, attestato} = req.body
    var planimetria_torre_file = dati_generali.planimetria_torre_file
    var verifica_strutturale_file = dati_generali.verifica_strutturale_file
    req.files.forEach(file =>{
        if(file.filename.includes("planimetria")) planimetria_torre_file = commessa_img_file_path + file.filename
        if(file.filename.includes("strutturale")) verifica_strutturale_file = commessa_img_file_path + file.filename
    })
    const q = 'UPDATE `torri_faro` SET `dati_generali`= ?,`visual_testing`= ?,`ultrasonic_testing`= ?,`magnetic_testing`= ?,`verifica_strutturale`= ?,`voci`= ?,`note`= ?,`verifica_rettilineita`= ?,`attestato`= ?,`planimetria_torre_file`= ?,`verifica_strutturale_file`= ? WHERE pl_id = ?'
    db.query(q, [JSON.stringify(dati_generali), JSON.stringify(visual_testing), JSON.stringify(ultrasonic_testing), JSON.stringify(magnetic_testing), JSON.stringify(verifica_strutturale), JSON.stringify(voci), JSON.stringify(note), JSON.stringify(verifica_rettilineita), JSON.stringify(attestato), planimetria_torre_file, verifica_strutturale_file, pl_id], (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        return res.json({'success' : true, 'message' : 'Torre faro aggiornata con successo'})
    })
}

const getTorrefaro = (req, res) =>{
    const pl_id = req.params.pl_id
    const q = `SELECT tr.*, pl.*, c.commessa_cod FROM torri_faro tr 
    RIGHT JOIN punti_luce pl ON tr.pl_id = pl.pl_id 
    INNER JOIN commesse_data c ON c.commessa_id = pl.commessa_id WHERE pl.pl_id = ?`
    db.query(q, [pl_id], (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        return res.json(data)
    })
}
export  {getPl, createPl, updateTorrefaro, getTorrefaro}