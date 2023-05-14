import db from '../config/dataBaseOptions.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const handleRefreshToken = (req, res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401)
    const refreshToken = cookies.jwt
    var q = 'SELECT `user_id` FROM `users_remembered` WHERE `token` = ?'
    db.query(q, [refreshToken], async (err, data)=>{
        if(err) console.log(err)
        if(data.length === 0){
            return res.sendStatus(403)
        }
        const user_id = data[0].user_id
        q = 'SELECT * FROM users INNER JOIN users_data ON users_data.user_id = users.user_id WHERE users.user_id = ?'
        db.query(q, [user_id], async (err, data)=>{
            if(err) console.log(err)
            if(data.length === 0){
                return res.sendStatus(403)
            }
            const user = data[0]
            const role = user.role
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) =>{
                    if(err || user.user_id !== decoded.user_id) {
                        console.log("founUser id: " +  user.user_id + " and decoded_id: " +decoded.user_id)
                        return res.sendStatus(403)
                    }
                    const accessToken = jwt.sign(
                        { 
                           "UserInfo" : {
                                "user_id" : user.user_id,
                                "email" : user.email,
                                "role" : role,
                                "nome" : user.nome,
                                "cognome" : user.cognome
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '30s'}
                    )
                    res.json({nome: user.nome, cognome: user.cognome, role: role, user_id: user.user_id, accessToken: accessToken})
                }
             )
        })
        }
    )
}

export default handleRefreshToken