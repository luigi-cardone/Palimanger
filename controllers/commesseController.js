import db from '../config/dataBaseOptions.js'

const getCommesse = (req, res) =>{
    const q = "SELECT * FROM `users` INNER JOIN users_data ON users.user_id = users_data.user_id"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getCommesse