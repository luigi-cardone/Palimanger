import bcrypt from 'bcryptjs'
import db from '../config/dataBaseOptions.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const handleLogin = (req, res) =>{
    const {email, password} = req.body
    if(!email || !password) return res.json({ 'error': true, 'message': 'Non sono stati inviati dati validi'})
    //Check if the user exists (return res.sendStatus(401))
    var q = 'SELECT * FROM users NATURAL JOIN users_data WHERE email = ?'
    db.query(q, [email], (err, data)=>{
        if(err) console.log(err)
        if(data.length === 0){
            return res.json({'error': true, 'message' : "L'utente non esiste"})
        }
        const foundUser = data[0]
        const hashedPassword = foundUser.password
        bcrypt.compare(password, hashedPassword, function(error, match){
            const {user_id, email, roles, name, surname} = foundUser
            if(match){
                q = 'UPDATE users SET last_login = ? WHERE user_id = ?'
                db.query(q, [new Date(), user_id], (err, data) => {
                    if(err) console.log(err)
                    const accessToken = jwt.sign(
                        {
                            "UserInfo" : {
                                "user_id" : user_id,
                                "email" : email,
                                "roles" : roles,
                                "name" : name,
                                "surname" : surname
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '30s'}
                        )
                    const refreshToken = jwt.sign(
                        { "user_id" : user_id },
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn: '1d'}
                        )
                    if(err) console.log(err)
                    var currentDate = new Date()
                    var expireDate = new Date(currentDate.getTime() + 86400000)
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                    q = 'SELECT * FROM `users_remembered` WHERE `user_id` = ?'
                    db.query(q, [user_id], (err, data) =>{
                        if(err) console.log(err)
                        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                        if(data.length === 0){
                            q = 'INSERT INTO `users_remembered`(`user_id`, `token`, `expire_date`) VALUES (?, ?, ?)'
                            db.query(q, [user_id, refreshToken, expireDate], (err, data) =>{
                                if(err) console.log(err)
                                return res.json({name, surname, roles: JSON.parse(roles), user_id, accessToken});
                            })
                        }
                        else{
                            q = 'UPDATE `users_remembered` SET `token`= ? ,`expire_date`= ? WHERE `user_id` = ? '   
                            db.query(q, [refreshToken, expireDate, user_id], (err, data) =>{
                                if(err) console.log(err)
                                return res.json({ name, surname, roles: JSON.parse(roles), user_id, accessToken});
                            })
                        }
                    })
                })
                }
            else{
                res.status(401).json({'error': true, 'message' : "Password errata"})
            }
        });
    })
}
export default handleLogin