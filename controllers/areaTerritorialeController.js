import db from '../config/dataBaseOptions.js'

const createAreaTerritoriale = (req, res) =>{
    const {nome, attivo} = req.body
    const q = "INSERT INTO `aree_territoriali`(`nome`, `attivo`) VALUES (?,?)"
    db.query(q, [nome, attivo], (err, data)=>{
        if(err) return {error: false, message: "Errore del Server"}
        return res.json({error: false, message: "Area territoriale aggiornata con successo"})
    })
}

const updateAreaTerritoriale = (req, res) =>{
    const {nome, attivo, area_territoriale_id} = req.body
    const q = "UPDATE `aree_territoriali` SET `nome`= ?,`attivo`= ? WHERE area_territoriale_id = ?"
    db.query(q, [nome, attivo, area_territoriale_id], (err, data)=>{
        if(err) return {error: false, message: "Errore del Server"}
        return res.json({error: false, message: "Area territoriale aggiornata con successo"})
    })
}
export {createAreaTerritoriale, updateAreaTerritoriale}