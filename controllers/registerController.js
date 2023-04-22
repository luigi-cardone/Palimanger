import bcrypt from 'bcryptjs'
import db from '../config/dataBaseOptions.js'
import math from 'math'
import roles from '../config/userRoles.js'

const handleNewUser = async (req, res) =>{
    const user = req.body
    const email = user.email
    const pwd = user.password
    if(!email || !pwd) return res.status(400).json({'error': true, 'message': 'Username and password required'})
    // Check if username already exists (res.sendStatus(409))
    var q = 'SELECT `email` FROM `users` WHERE `email` = ?'
    db.query(q, [email], async (err, data)=>{
        if(err) console.log(err)
        if(data.length !== 0){
            return res.status(409).json({'error': true, 'message': 'Username already exits'})
        }
        try{
            const hashedPwd = await bcrypt.hash(pwd, 10)
            // Store the new user 
            var q = 'INSERT INTO `users` ( `email`, `password`, `roles`) VALUES ( ?, ?, ? ) '
            db.query(q, [email, hashedPwd, JSON.stringify([1])] ,(err, data)=>{
                if(err) console.log(err)
                const user_id = data.insertId
                q = 'INSERT INTO `users_data`(`user_id`, `name`, `surname`, `tel`) VALUES (?, ?, ?, ?) '
                db.query(q, [user_id ,user.name, user.surname, user.tel] ,(err, data)=>{
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