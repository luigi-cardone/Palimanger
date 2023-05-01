import db from '../config/dataBaseOptions.js'
const createComune = (req, res) =>{
    const {nome, acronimo, cod_provincia, area_territoriale_id, cliente_id } = req.body
    const q = "INSERT INTO `comuni`(`nome`, `acronimo`, `cod_provincia`, `area_territoriale_id`, `cliente_id`) VALUES (?,?,?,?,?)"
    db.query(q, [nome, acronimo, cod_provincia, area_territoriale_id, cliente_id] , (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
        return res.json({'error' : false, 'message' : 'Comune creato con successo'})
    })
}

const updateComune = (req, res) =>{
    const {comune_id, nome, acronimo, cod_provincia, area_territoriale_id, cliente_id } = req.body
    const q = "UPDATE `comuni` SET `nome`= ?,`acronimo`= ?,`cod_provincia`= ?,`area_territoriale_id`= ?,`cliente_id`= ? WHERE comune_id = ?"
    db.query(q, [comune_id, nome, acronimo, cod_provincia, area_territoriale_id, cliente_id] , (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
        return res.json({'error' : false, 'message' : 'Comune aggiornato con successo'})
    })
}
export { createComune, updateComune }