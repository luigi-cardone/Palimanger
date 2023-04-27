import db from '../config/dataBaseOptions.js'
const getComuni = (req, res) =>{
    const q = "SELECT * FROM comuni"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getComuni