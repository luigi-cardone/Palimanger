import db from '../config/dataBaseOptions.js'
const createCliente = (req, res) =>{
    const {cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto,comune_id } = req.body
    var q = "INSERT INTO `clienti`(`cod_cliente`, `ragione_sociale`, `sito_legale`, `sito_operativo`, `vat_number`, `codice_fiscale`, `email`, `pec`, `unic_code`, `tel`, `contratto`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(q, [cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto] , (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
        if(comune_id.length === 0) return res.json({'error' : false, 'message' : 'Cliente creato con successo'})
        q = ""
        const cliente_id = data.insertId
        comune_id.forEach(comune =>{
            q += "INSERT INTO `comune_cliente_rel`(`comune_id`, `cliente_id`) VALUES ("+comune+","+cliente_id+");"
        })
        db.query(q , (err, data)=>{
            if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
            return res.json({'error' : false, 'message' : 'Cliente creato con successo'})
        })
    })
}

const updateCliente = (req, res) =>{
    const {cliente_id, cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto, comune_id} = req.body
    var q = "UPDATE `clienti` SET `cod_cliente`= ?,`ragione_sociale`= ?,`sito_legale`= ?,`sito_operativo`= ?,`vat_number`= ?,`codice_fiscale`= ?,`email`= ?,`pec`= ?,`unic_code`= ?,`tel`= ?,`contratto`= ? WHERE cliente_id = ?"
    db.query(q, [cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto, cliente_id] , (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        q = "SELECT * FROM comune_cliente_rel WHERE cliente_id = ?"
        db.query(q, [cliente_id], (err, data) =>{
            if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
            const comuni_assegnati = data
            q="UPDATE `comune_cliente_rel` SET `active`= 0 WHERE cliente_id = "+cliente_id + ";"
            comune_id.forEach(comune =>{
                var comune_copia = comuni_assegnati.find(comune_assegnato => comune_assegnato.comune_id === comune)
                if(comune_copia) q += "UPDATE `comune_cliente_rel` SET `active`= 1 WHERE id = "+ comune_copia.id + ";"
                else q += "INSERT INTO `comune_cliente_rel`(`comune_id`, `cliente_id`, `active`) VALUES ("+comune+","+cliente_id+", 1);"
            })
            db.query(q , (err, data)=>{
                if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server 2'})}
                return res.json({'error' : false, 'message' : 'Cliente aggiornato con successo'})
            })

        })
    })
}
export { createCliente, updateCliente }