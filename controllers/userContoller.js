import bcrypt from 'bcryptjs'
import db from '../config/dataBaseOptions.js'
import ROLES_LIST from '../config/userRoles.js'

const getUserBioData = (req, res) =>{
    const user_id = req.params.user_id
    const q = "SELECT * FROM users INNER JOIN users_data ON users_data.user_id = users.user_id"
    db.query(q, [user_id], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

const updateUserBioData = (req, res) =>{
    const {user_id, nome, cognome, email, tel, attivo, referente} = req.body
    console.log(req.body)
    const q = "UPDATE users_data JOIN users ON users_data.user_id = users.user_id SET users_data.nome = ?, users_data.cognome = ?, users_data.tel = ?, users.email = ?, users.attivo = ?, users.referente = ? WHERE users.user_id = ?"
    db.query(q, [nome, cognome, tel, email, attivo, referente, user_id], (err, data)=>{
        if(err) {
            console.log(err)
            return res.json({'error' : true, 'message' : err})
        }
        return res.json({'error' : false, 'message' : 'Utente aggiornato con successo'})
    })
}

const createUser = async (req, res) =>{
    const {comune_id, attivo, referente, cognome, nome, email, ruolo, cliente_id, tel, fornitore_id} = req.body
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
    const hashedPwd = await bcrypt.hash(password, 10)
    var q = 'INSERT INTO `users` ( `cliente_id`, `comune_id`, `fornitore_id`, `email`, `password`, `attivo`, `role`, `referente`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )'
    db.query(q, [cliente_id, comune_id, fornitore_id, email, hashedPwd, attivo, ruolo, referente] ,(err, data)=>{
        if(err) console.log(err)
        const user_id = data.insertId
        q = 'INSERT INTO `users_data`(`user_id`, `nome`, `cognome`, `tel`) VALUES (?, ?, ?, ?)'
        db.query(q, [user_id ,nome, cognome, tel] ,(err, data)=>{
            if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
            return res.json({'error' : false, 'message' : 'Utente creato con successo\nLa password generata è la seguente:\n'+password})
        })
    })
}

const deleteUser = (req, res) =>{
    const user_id = req.params.user_id
    const q = "DELETE FROM users INNER JOIN users_data ON users_data.user_id = users.user_id WHERE users.user_id = ?"
    db.query(q, [user_id], (err, data)=>{
        if(err) return res.json({'error' : true, 'message' : 'Errore del Server'})
        return res.json({'error' : false, 'message' : 'Utente eliminato con successo'})
    })
}
export {getUserBioData, updateUserBioData, deleteUser, createUser}