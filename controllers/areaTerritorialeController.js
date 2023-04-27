import db from '../config/dataBaseOptions.js'

const createAreaTerritoriale = (req, res) =>{
    const {nome, attivo} = req.body.territorio
    const q = "INSERT INTO `aree_territoriali`(`nome`, `attivo`) VALUES (?,?)"
    db.query(q, [nome, attivo], (err, data)=>{
        if(err) return console.log(err.message)
        return res.json({error: false, message: ""})
    })
}

const updateAreaTerritoriale = (req, res) =>{
    const {nome, attivo, aree_territoriali_id} = req.body.territorio
    const q = "UPDATE `aree_territoriali` SET `nome`= ?,`attivo`= ? WHERE aree_territoriali_id = ?"
    db.query(q, [nome, attivo, aree_territoriali_id], (err, data)=>{
        if(err) return console.log(err.message)
        return res.json({error: false, message: ""})
    })
}
export {createAreaTerritoriale, updateAreaTerritoriale}