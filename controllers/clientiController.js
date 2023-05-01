import db from '../config/dataBaseOptions.js'
const getCustomers = (req, res) =>{
    const q = "SELECT * FROM clienti WHERE 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getCustomers