import db from '../config/dataBaseOptions.js'

const getCommesse = (req, res) =>{
    const q = `SELECT c.*, cd.*, com.comune, cl.ragione_sociale FROM commesse c 
    INNER JOIN commesse_data cd ON c.commessa_id = cd.commessa_id 
    INNER JOIN clienti cl ON c.cliente_id = cl.cliente_id 
    INNER JOIN comuni com ON c.comune_id = com.comune_id`
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getCommesse