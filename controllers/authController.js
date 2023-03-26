import bcrypt from 'bcryptjs'
import db from '../config/dataBaseOptions.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import math from 'math'

dotenv.config()
const handleLogin = (req, res) =>{
    const {username, password} = req.body
    if(!username || !password) return res.sendStatus(400).json({ 'message': 'Non si possiedono le autorizzazioni necessarie'})
    //Check if the user exists (return res.sendStatus(401))
    var q = 'SELECT * FROM users WHERE username = ?'
    db.query(q, [username], (err, data)=>{
        if(err) console.log(err)
        if(data.length === 0){
            return res.sendStatus(401).json({'message' : "L'utente non esiste"})
        }
        const foundUser = data[0]
        const hashedPassword = foundUser.password
        bcrypt.compare(password, hashedPassword, function(error, match){
            if(match){
                const {user_id, username, roles, email} = foundUser
                const accessToken = jwt.sign(
                    { 
                        "UserInfo" : {
                            "user_id" : user_id,
                            "username" : username,
                            "roles" : roles,
                            "email" : email
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
                var expireDate = math.floor(currentDate.getTime() / 1000) + 86400
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                q = 'UPDATE `users` SET user_token = ?, expire_date = ? where user_id = ?'
                db.query(q, [refreshToken, expireDate, user_id], (err, data) =>{
                    if(err) console.log(err)
                    res.json({email: email, roles: [roles], user_id: user_id, accessToken: accessToken, username: username});
                })
    
                }
            else{
                res.status(401).json({'message' : 'Password errata'})
            }
        });
    })
}

export default handleLogin