import db from '../config/dataBaseOptions.js'
const getCommessa = (req, res) =>{
    const commessa_id = req.params.commessa_id
    const q = `SELECT c.*, cd.*, com.comune, cl.ragione_sociale, u.nome, u.cognome, u2.nome nome_mod, u2.cognome cognome_mod, ref_data.nome referente_nome, ref_data.cognome referente_cognome, ref.email referente_email, ref_data.tel referente_tel FROM commesse c 
    INNER JOIN commesse_data cd ON c.commessa_id = cd.commessa_id 
    INNER JOIN clienti cl ON c.cliente_id = cl.cliente_id 
    INNER JOIN comuni com ON c.comune_id = com.comune_id 
    INNER JOIN users_data u ON c.user_id = u.user_id 
    INNER JOIN users_data u2 ON c.modificato_da_id = u2.user_id 
    INNER JOIN users_data ref_data ON cd.referente_id = ref_data.user_id 
    INNER JOIN users ref ON ref.user_id = cd.referente_id WHERE c.commessa_id = ?`
    db.query(q, [commessa_id], (err, data)=>{
        if(err) {console.log(err); return 0}
        return res.json(data)
    })
}

const createCommessa = (req, res) =>{
    const {cliente_id, user_id, modificato_da_id, data_modifica, comune_id, referente_id, fornitore_id_1, fornitore_id_2, data_inizio, data_fine, configurazione_id, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne} = req.body
    var q = "SELECT c.acronimo, c.cod_provincia, cl.cod_cliente FROM comuni c INNER JOIN clienti cl ON c.comune_id = ? AND cl.cliente_id = ?"
    db.query(q, [comune_id, cliente_id], (err, data) =>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : ""})}
        const acronimo = data[0].acronimo
        const cod_provincia = data[0].cod_provincia
        const cod_cliente = data[0].cod_cliente
        q = "INSERT INTO `commesse`(`cliente_id`, `user_id`, `modificato_da_id`, `data_modifica`, `comune_id`) VALUES (?,?,?,?,?)"
        db.query(q, [cliente_id, user_id, modificato_da_id, data_modifica, comune_id], (err, data)=>{
            if(err) {console.log(err); return res.json({'error' : true, 'message' : "Errore nell'inserimento dati commessa"})}
            const commessa_id = data.insertId
            const commessa_cod = `${acronimo}_${cod_provincia}_${cod_cliente}_${new Date().getFullYear()}${new Date().getMonth()}_${commessa_id}`
            q = "INSERT INTO `commesse_data`(`commessa_id`, `referente_id`, `fornitore_id_1`, `fornitore_id_2`, `data_inizio`, `data_fine`, `configurazione_id`, `azienda_manutentrice`, `contatti_manutentore`, `tipo_verifica`, `note`, `note_interne`, `commessa_cod` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(q, [commessa_id, referente_id, fornitore_id_1, fornitore_id_2, data_inizio, data_fine, configurazione_id, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, commessa_cod] ,(err, data)=>{
                if(err) console.log(err)
                return res.json({'error' : false, 'message' : 'Commessa creata con successo'})
            })
        })
    })
}

const updateCommessa = (req, res) =>{
    const {referente_id, fornitore_id_1, fornitore_id_2, data_inizio, data_fine, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, tel_referente, email_referente, id} = req.body
    const q = "UPDATE `commesse_data` SET `referente_id`= ?,`fornitore_id_1`= ?,`fornitore_id_2`= ?,`data_inizio`= ?,`data_fine`=?,`azienda_manutentrice`=?,`contatti_manutentore`=?,`tipo_verifica`=?,`note`=?,`note_interne`=?,`tel_referente`=?,`email_referente`=? WHERE id = ?"
    db.query(q, [referente_id, fornitore_id_1, fornitore_id_2, data_inizio, data_fine, azienda_manutentrice, contatti_manutentore, tipo_verifica, note, note_interne, tel_referente, email_referente, id], (err, data)=>{
        if(err) {console.log(err); return 0}
        return res.json(data)
    })
}

const getCommessaUsers = (req, res) =>{
    const commessa_id = req.params.commessa_id
    const q = "SELECT * FROM commessa_utente_rel cur INNER JOIN users u ON cur.user_id = u.user_id INNER JOIN users_data ud ON u.user_id = ud.user_id WHERE cur.commessa_id = ? and cur.active = 1"
    db.query(q, [commessa_id], (err, data)=>{
        if(err) {console.log(err); return 0}
        return res.json(data)
    })
}

const updateCommessaUsers = (req, res) =>{
    const {users_id, commessa_id} = req.body
    var q = "SELECT * FROM commessa_utente_rel WHERE commessa_id = ?"
    db.query(q, [commessa_id], (err, data) =>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        const utenti_assegnati = data
        q = ""
        users_id.forEach(user_id =>{
            var utente_copia = utenti_assegnati.find(utente_assegnato => utente_assegnato.user_id === user_id)
            if(utente_copia) q += "UPDATE `commessa_utente_rel` SET `active`= 1 WHERE id = "+ utente_copia.id + ";"
            else q += "INSERT INTO `commessa_utente_rel`(`user_id`, `commessa_id`, `active`) VALUES ("+user_id+","+commessa_id+", 1);"
        })
        db.query(q , (err, data)=>{
            if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server 2'})}
            return res.json({'error' : false, 'message' : 'Cliente aggiornato con successo'})
        })

    })
}
const deleteCommessaUser = (req, res) =>{
    const user_id = req.params.user_id
    var q = "UPDATE `commessa_utente_rel` SET `active`= 0 WHERE user_id = ?"
    db.query(q, [user_id], (err, data) =>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        return res.json({'error' : false, 'message' : 'Cliente rimosso con successo'})
    })
}
export {getCommessa, createCommessa, updateCommessa, getCommessaUsers, updateCommessaUsers, deleteCommessaUser}