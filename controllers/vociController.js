import db from '../config/dataBaseOptions.js'
const getVoci = (req, res) =>{
    const q = "SELECT * FROM voci WHERE 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

const createVoce = (req, res) =>{
    const voce = req.body.voce
    const q = "INSERT INTO `voci`(`voce`) VALUES (?)"
    db.query(q, [voce], (err, data)=>{
        if(err) {console.log(err); return res.json(err)}
        return res.json({error: false, message: "Voce aggiunta con successo"})
    })
}
export  {getVoci, createVoce}