import db from '../config/dataBaseOptions.js'

const getUserBioData = (req, res) =>{
    const user_id = req.params.user_id
    const q = "SELECT * FROM users NATURAL JOIN users_data"
    db.query(q, [user_id], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
const updateUserBioData = (req, res) =>{
    const {name, company, vat_number, ssn_number, address, zip, city, state, region, location, phone, user_id} = req.body
    const q = "UPDATE users_data JOIN users ON users_data.user_id = users.id SET users_data.name = ?, users_data.company = ?, users_data.vat_number = ?, users_data.ssn_number = ?, users_data.address = ?, users_data.zip = ?, users_data.city = ?, users_data.state = ?, users_data.region = ?, users_data.location = ?, users_data.phone = ? WHERE user_id = ?"
    db.query(q, [name, company, vat_number, ssn_number, address, zip, city, state, region, location, phone, user_id], (err, data)=>{
        if(err) {
            console.log(err)
            return res.json({'error' : true, 'message' : err})
        }
        return res.json({'error' : false, 'message' : 'utente aggiornato con successo'})
    })
}

const deleteUser = (req, res) =>{
    const user_id = req.params.user_id
    const q = "DELETE FROM users NATURAL JOIN users_data WHERE `user_id` = ?"
    db.query(q, [user_id], (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'errore'})
        return res.json({'error' : false, 'message' : 'utente eliminato con successo'})
    })
}
export {getUserBioData, updateUserBioData, deleteUser}