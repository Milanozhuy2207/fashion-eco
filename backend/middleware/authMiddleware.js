const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const protect = async(req, res, next) => {
    let token 

    if(req.headrs.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.heaers.authorization && req.headers.split('')[1]
        }
        catch(error){
            res.status(401).json({message: 'Not authorized, no token'})
        }
    }
    if(!token){
        res.status(401).json({message: 'Not authorized, no token'})
    }
}

module.exports = {protect}