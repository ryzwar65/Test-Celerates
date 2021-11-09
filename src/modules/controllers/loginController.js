const db = require('../../database/connection')
const bcrypt = require('bcrypt')
const {loginMapper} = require('../mappers/loginMapper')
const jwt = require('jsonwebtoken')
const accessTokenSecret = "53c!23t"

exports.login = async (request,response)=>{   
    try {
        const { username, password } = request.body
        const user  = await db('users').where('username',username).first()        
        if (user!=undefined && bcrypt.compareSync(password,user.password)) {         
            const accessToken = jwt.sign({ username: user.username}, accessTokenSecret);
            const map = loginMapper(user,201,accessToken)        
            return response.status(201).json(map)   
        }else{
            throw new Error("user does not exist");            
        }  
    } catch (error) {
        const map = loginMapper(error,404,null)        
        return response.status(404).json(map)
    }        
}