import bcrypt from 'bcryptjs'
import db from '../config/dataBaseOptions.js'
import math from 'math'
import ROLES_LIST from '../config/userRoles.js'

const handleNewUser = async (req, res) =>{
    const user = req.body
    const email = user.email
    const pwd = user.password
    if(!email || !pwd) return res.status(400).json({'error': true, 'message': 'Sono neccessari username e password'})
    // Check if username already exists (res.sendStatus(409))
    var q = 'SELECT `email` FROM `users` WHERE `email` = ?'
    db.query(q, [email], async (err, data)=>{
        if(err) console.log(err)
        if(data.length !== 0){
            return res.status(409).json({'error': true, 'message': "L'utente è già registrato"})
        }
        try{
            const hashedPwd = await bcrypt.hash(pwd, 10)
            // Store the new user 
            var q = 'INSERT INTO `users` ( `email`, `password`, `roles`) VALUES ( ?, ?, ? ) '
            db.query(q, [email, hashedPwd, JSON.stringify([ROLES_LIST.Cliente])] ,(err, data)=>{
                if(err) console.log(err)
                const user_id = data.insertId
                q = 'INSERT INTO `users_data`(`user_id`, `nome`, `cognome`, `tel`) VALUES (?, ?, ?, ?) '
                db.query(q, [user_id ,user.nome, user.cognome, user.tel] ,(err, data)=>{
                    if(err) console.log(err)
                    res.status(201).json({})
                })
            })
        }
        catch (err){
            console.log(err)
            res.status(500).json({'error': true, 'message': err.message})
        }
    })
}


export default handleNewUser