const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (uid, userAgent, userIp) => new Promise((resolve, reject) => {
        const payload = { uid, userAgent, userIp };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '60d',
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Error generating the token');
            } else {
                resolve(token);
            }
        });
    });

module.exports = {
    generateJWT,
};