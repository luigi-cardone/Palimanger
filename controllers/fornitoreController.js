import db from '../config/dataBaseOptions.js'
const createFornitore = (req, res) =>{
    const {cod_fornitore, ragione_sociale, sito_legale, sito_operativo, vat_number, email, pec, unic_code, tel } = req.body
    const q = "INSERT INTO `fornitori`(`cod_fornitore`, `ragione_sociale`, `sito_legale`, `sito_operativo`, `vat_number`, `email`, `pec`, `unic_code`, `tel`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(q, [cod_fornitore, ragione_sociale, sito_legale, sito_operativo, vat_number,email, pec, unic_code, tel] , (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        return res.json({'error' : false, 'message' : 'Fornitore creato con successo'})
    })
}

const updateFornitore = (req, res) =>{
    const {fornitore_id, cod_fornitore, ragione_sociale, sito_legale, sito_operativo, vat_number,email, pec, unic_code, tel } = req.body
    const q = "UPDATE `fornitori` SET `cod_fornitore`= ?,`ragione_sociale`= ?,`sito_legale`= ?,`sito_operativo`= ?,`vat_number`= ?, `email`= ?,`pec`= ?,`unic_code`= ?,`tel`= ? WHERE fornitore_id = ?"
    db.query(q, [cod_fornitore, ragione_sociale, sito_legale, sito_operativo, vat_number, email, pec, unic_code, tel, fornitore_id] , (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        return res.json({'error' : false, 'message' : 'Fornitore aggiornato con successo'})
    })
}
export { createFornitore, updateFornitore }