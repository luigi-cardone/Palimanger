import db from '../config/dataBaseOptions.js'

const createAreaTerritoriale = (req, res) =>{
    const {nome} = req.body
    const q = "INSERT INTO `aree_territoriali`(`nome`) VALUES (?)"
    db.query(q, [nome], (err, data)=>{
        if(err) return {error: false, message: "Errore del Server"}
        return res.json({error: false, message: "Area territoriale aggiornata con successo"})
    })
}

const updateAreaTerritoriale = (req, res) =>{
    const {nome, area_territoriale_id} = req.body
    const q = "UPDATE `aree_territoriali` SET `nome`= ? WHERE area_territoriale_id = ?"
    db.query(q, [nome, area_territoriale_id], (err, data)=>{
        if(err) return {error: false, message: "Errore del Server"}
        return res.json({error: false, message: "Area territoriale aggiornata con successo"})
    })
}
export {createAreaTerritoriale, updateAreaTerritoriale}