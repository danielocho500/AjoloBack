const jwt = require('jsonwebtoken');
const { getRequestData } = require('../helpers/getRequestData');
require('dotenv').config();

const validateJWT = async (req, res, next) => {
    const token = req.header('authToken');
    console.log('el token es: ', token)

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the header',
        });
    }

    try {
        const { userAgent: userAgentToken, userIp: userIpToken } = jwt.verify(token, process.env.SECRET_KEY);
        const { userAgent, userIp } = getRequestData(req);

        if (userAgent === userAgentToken) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'invalid token',
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            ok: false,
            msg: 'No valid Token',
        });
        
    }
};

module.exports = {
    validateJWT,
};