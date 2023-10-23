const { generateRandomString } = require("../../helpers/generateqrcode");
const QR = require("../../models/Qrcodes");

const createQR = async (uuid) => {

    const currentTimestamp = Date.now();
    const futureTimestamp = currentTimestamp + 5 * 60 * 1000;
    const code_qr =  generateRandomString(8);
    try{
        await QR.create({
            uuid,
            code_qr,
            expiration_time: futureTimestamp
        })

        console.log(code_qr)

        return code_qr;
    }
    catch(e){
        console.log(e)
        return -1;
    }
};

module.exports = {
  createQR,
};
