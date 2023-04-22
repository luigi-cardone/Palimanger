import db from '../config/dataBaseOptions.js'
const getUsers = (req, res) =>{
    const q = "SELECT * FROM users NATURAL JOIN users_data"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getUsers