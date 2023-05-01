import db from '../config/dataBaseOptions.js'
const createCliente = (req, res) =>{
    const {cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto } = req.body.cliente
    const q = "INSERT INTO `clienti`(`cod_cliente`, `ragione_sociale`, `sito_legale`, `sito_operativo`, `vat_number`, `codice_fiscale`, `email`, `pec`, `unic_code`, `tel`, `contratto`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(q, [cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto] , (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
        return res.json({'error' : false, 'message' : 'Cliente creato con successo'})
    })
}

const updateCliente = (req, res) =>{
    const {cliente_id, cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto } = req.body.cliente
    const q = "UPDATE `clienti` SET `cod_cliente`= ?,`ragione_sociale`= ?,`sito_legale`= ?,`sito_operativo`= ?,`vat_number`= ?,`codice_fiscale`= ?,`email`= ?,`pec`= ?,`unic_code`= ?,`tel`= ?,`contratto`= ? WHERE cliente_id = ?"
    db.query(q, [cod_cliente, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto, cliente_id] , (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
        return res.json({'error' : false, 'message' : 'Cliente aggiornato con successo'})
    })
}
export { createCliente, updateCliente }