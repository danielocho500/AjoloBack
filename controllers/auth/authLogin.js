const { verifyConnection } = require('../../db/verifyConnection');
const { checkPassword } = require('../../helpers/checkPassword');
const { getRequestData } = require('../../helpers/getRequestData');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { generateJWT } = require('../../jwt/generateJWT');
const User = require('../../models/User');

const authLogin = async (req, res) => {
    console.log('POST Login');

    const { email, password } = req.body;
    const { userAgent, userIp } = getRequestData(req);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return responseMsg(res, 401, true, 'The credentials are incorrect', {
            logged: false,
        });
    }

    const ismatch = await checkPassword(password, user.ps);

    if (!ismatch) {
        return responseMsg(res, 401, true, 'The credentials are incorrect', {
            logged: false,
        });
    }

    try {
        const token = await generateJWT(user.uid, userAgent, userIp);

        return responseMsg(res, 200, true, '', {
            emailconfirmed: user.emailconfirmed,
            isregistered: user.isregistered,
            logged: true,
            token,
        });
    } catch {
        return responseServerError(res);
    }
};

module.exports = {
    authLogin,
};