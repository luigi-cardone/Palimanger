import db from '../config/dataBaseOptions.js'
const getComuni = (req, res) =>{
    const q = "SELECT * FROM comuni c WHERE 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getClientiAssegnati = (req, res) =>{
    const q = "SELECT comune_id, cliente_id FROM comune_cliente_rel ccr WHERE ccr.active = 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export {getComuni, getClientiAssegnati}