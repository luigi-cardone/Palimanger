import db from '../config/dataBaseOptions.js'
const getFornitori = (req, res) =>{
    const q = "SELECT * FROM fornitori WHERE 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getFornitori