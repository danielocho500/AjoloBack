const { createUser } = require('../../db/user/createUser')
const { emailExists } = require('../../db/user/emailExists');
const { verifyConnection } = require('../../db/verifyConnection');
const { getRequestData } = require('../../helpers/getRequestData');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { generateJWT } = require('../../jwt/generateJWT');

const authRegister = async (req, res) => {
    console.log('POST register');
    const { email, password, username } = req.body;
    const { userAgent, userIp } = getRequestData(req);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseMsg(res, 500, 'error', 'internal server error', {
            registered: false,
        });
    }

    const validEmail = await emailExists(email);
    if (!validEmail) {
        return responseMsg(res, 401, 'fail', 'email already registered', {
            registered: false,
        });
    }

    try {
        const user = await createUser(password, email, username);

        const token = await generateJWT(user.uid, userAgent, userIp);

        return responseMsg(res, 200, true, '', {
            registered: true,
            token,
        });
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    authRegister,
};