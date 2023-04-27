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
    const {customer_id, user_id, modified_by, modified_date, citta, referente, fornitore_1, fornitore_2, data_inizio, data_fine, configurazione, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, punti_luce} = req.body.commessa
    const q = "INSERT INTO `commesse`(`customer_id`, `user_id`, `modified_by`, `modified_date`, `city`) VALUES (?,?,?,?,?)"
    db.query(q, [customer_id, user_id, modified_by, modified_date, citta], (err, data)=>{
        if(err) console.log(err)
        const commessa_id = data.insertId
        q = "INSERT INTO `commesse_data`(`commessa_id`, `referent`, `supplier`, `supplier_2`, `begin_date`, `end_date`, `configuration`, `manufacturer`, `manufacturer_contacts`, `verify_type`, `note`, `private_note`, `punti_luce`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
        db.query(q, [commessa_id, referente, fornitore_1, fornitore_2, data_inizio, data_fine, configurazione, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, punti_luce] ,(err, data)=>{
            if(err) console.log(err)
            return res.json({'error' : false, 'message' : 'commessa creata con successo'})
        })
    })
}

const updateCommessa = (req, res) =>{
    const q = "SELECT * FROM users NATURAL JOIN users_data"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export {getCommessa, createCommessa, updateCommessa}