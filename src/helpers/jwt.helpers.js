const jwt = require('jsonwebtoken');

const createAccessToken = (payload) =>{

    const accessJwt = jwt.sign({ payload }, process.env.jwt_access_secret, {expiresIn : "15m"});
    return Promise.resolve(accessJwt)
}

const createRefreshToken = (payload) =>{

    const refreshJwt = jwt.sign({ payload }, process.env.jwt_refresh_secret, {expiresIn : "30d"});
    return Promise.resolve(refreshJwt)
}

module.exports = {createAccessToken, createRefreshToken}

