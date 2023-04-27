import bcrypt from 'bcryptjs'
import db from '../config/dataBaseOptions.js'
import ROLES_LIST from '../config/userRoles.js'

const getUserBioData = (req, res) =>{
    const user_id = req.params.user_id
    const q = "SELECT * FROM users NATURAL JOIN users_data"
    db.query(q, [user_id], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

const updateUserBioData = (req, res) =>{
    const {user_id, nome, cognome, email, tel, attivo} = req.body.user_modify
    const q = "UPDATE users_data JOIN users ON users_data.user_id = users.user_id SET users_data.name = ?, users_data.surname = ?, users_data.tel = ?, users.email = ?, users.active = ? WHERE users.user_id = ?"
    db.query(q, [nome, cognome, tel, email, attivo, user_id], (err, data)=>{
        if(err) {
            console.log(err)
            return res.json({'error' : true, 'message' : err})
        }
        return res.json({'error' : false, 'message' : 'utente aggiornato con successo'})
    })
}

const createAdmin = async (req, res) =>{
    const {attivo, cognome, nome, email, tel} = req.body.admin
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
    const hashedPwd = await bcrypt.hash(password, 10)
    var q = 'INSERT INTO `users` ( `email`, `password`, `roles`, `active`) VALUES ( ?, ?, ?, ? )'
    db.query(q, [email, hashedPwd, JSON.stringify([ROLES_LIST.Admin]), attivo] ,(err, data)=>{
        if(err) console.log(err)
        const user_id = data.insertId
        q = 'INSERT INTO `users_data`(`user_id`, `name`, `surname`, `tel`) VALUES (?, ?, ?, ?)'
        db.query(q, [user_id ,nome, cognome, tel] ,(err, data)=>{
            if(err) return res.json({'error' : true, 'message' : 'errore'})
            return res.json({'error' : false, 'message' : 'utente eliminato con successo', 'password' : password})
        })
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
export {getUserBioData, updateUserBioData, deleteUser, createAdmin}