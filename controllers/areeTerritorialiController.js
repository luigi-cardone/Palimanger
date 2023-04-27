import db from '../config/dataBaseOptions.js'

const getAreeTerritoriali = (req, res) =>{
    const q = "SELECT * FROM `aree_territoriali` WHERE 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getAreeTerritoriali