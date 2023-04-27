import db from '../config/dataBaseOptions.js'
const createCliente = (req, res) =>{
    const {cod, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto } = req.body.cliente
    const q = "INSERT INTO `customers`(`cod`, `ragione_sociale`, `sito_legale`, `sito_operativo`, `vat_number`, `codice_fiscale`, `email`, `pec`, `unic_code`, `tel`, `contratto`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(q, [cod, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto] , (err, data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
}

const updateCliente = (req, res) =>{
    const {customer_id, cod, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto } = req.body.cliente
    const q = "UPDATE `customers` SET `cod`= ?,`ragione_sociale`= ?,`sito_legale`= ?,`sito_operativo`= ?,`vat_number`= ?,`codice_fiscale`= ?,`email`= ?,`pec`= ?,`unic_code`= ?,`tel`= ?,`contratto`= ? WHERE customer_id = ?"
    db.query(q, [cod, ragione_sociale, sito_legale, sito_operativo, vat_number, codice_fiscale, email, pec, unic_code, tel, contratto, customer_id] , (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export { createCliente, updateCliente }