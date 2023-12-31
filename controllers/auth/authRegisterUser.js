const { createUser } = require("../../db/user/createUser");
const { emailExists } = require("../../db/user/emailExists");
const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken")
const { getRoleByUuid } = require("../../db/user/getRoleByUuid")
const { ROLES } = require("../../helpers/RolesEnum")
const { generateJWT } = require("../../jwt/generateJWT");

const authRegisterUser = async (req, res) => {

    const { email, password, username, id_rol } = req.body;
    const token = req.header('authToken');

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseMsg(res, 500, "error", "internal server error", {
            registered: false,
        });
    }

    const uuid = await getUidByToken(token)
    const role = await getRoleByUuid(uuid);

    if(role != ROLES.ADMIN){
        return responseMsg(res, 501, "fail", "Not Authorized", {
            registered: false,
        });
    }

    const validEmail = await emailExists(email);
    if (!validEmail) {
        return responseMsg(res, 401, "fail", "email already registered", {
            registered: false,
        });
    }

    try {
        const user = await createUser(password, email, username, id_rol);

        return responseMsg(res, 200, 'success', "User registered", {
            userInfo: {
                email: user.email,
                id_rol: user.id_rol,
                user_name: user.user_name,
                coins: user.coins,
                image_url: user.image_url,
                language_configured: user.language_configured
            },
            registered: true,
        });
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
}

module.exports = {
    authRegisterUser,
}