import db from '../config/dataBaseOptions.js'
const getCommessa = (req, res) =>{
    const commessa_id = req.params.commessa_id
    const q = "SELECT * FROM commesse NATURAL JOIN commesse_data WHERE commessa_id = ?"
    db.query(q, [commessa_id], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

const createCommessa = (req, res) =>{
    const {cliente_id, user_id, modificato_da, data_modifca, comune, referente, fornitore_1, fornitore_2, data_inizio, data_fine, configurazione_id, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, punti_luce} = req.body.commessa
    const q = "INSERT INTO `commesse`(`cliente_id`, `user_id`, `modificato_da`, `data_modifca`, `comune`) VALUES (?,?,?,?,?)"
    db.query(q, [cliente_id, user_id, modificato_da, data_modifca, comune], (err, data)=>{
        if(err) res.json({'error' : true, 'message' : 'Errore del Server'})
        const commessa_id = data.insertId
        q = "INSERT INTO `commesse_data`(`commessa_id`, `referente`, `fornitore_1`, `fornitore_2`, `data_inizio`, `data_fine`, `configurazione_id`, `azienda_manutentrice`, `contatti_manutentore`, `tipo_verifica`, `note`, `note_interne`, `punti_luce`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
        db.query(q, [commessa_id, referente, fornitore_1, fornitore_2, data_inizio, data_fine, configurazione_id, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, punti_luce] ,(err, data)=>{
            if(err) res.json({'error' : true, 'message' : 'Errore del Server'})
            return res.json({'error' : false, 'message' : 'Commessa creata con successo'})
        })
    })
}
export {getCommessa, createCommessa}