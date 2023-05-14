import db from '../config/dataBaseOptions.js'
const getPls = (req, res) =>{
    const q = "SELECT * FROM punti_luce"
    db.query(q, (err, data)=>{
        if(err) {console.log(err); return res.json(err)}
        return res.json(data)
    })
}
export default getPls