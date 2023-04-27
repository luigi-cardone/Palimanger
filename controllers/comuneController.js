import db from '../config/dataBaseOptions.js'
const createComune = (req, res) =>{
    const {nome, acronimo, cod_provincia, territori_id, clienti_id } = req.body.comune
    const q = "INSERT INTO `comuni`(`nome`, `acronimo`, `cod_provincia`, `territori_id`, `clienti_id`) VALUES (?,?,?,?,?)"
    db.query(q, [nome, acronimo, cod_provincia, territori_id, clienti_id] , (err, data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
}

const updateComune = (req, res) =>{
    const {comuni_id, nome, acronimo, cod_provincia, territori_id, clienti_id } = req.body.comune
    const q = "UPDATE `comuni` SET `nome`= ?,`acronimo`= ?,`cod_provincia`= ?,`territori_id`= ?,`clienti_id`= ? WHERE comuni_id = ?"
    db.query(q, [comuni_id, nome, acronimo, cod_provincia, territori_id, clienti_id] , (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export { createComune, updateComune }