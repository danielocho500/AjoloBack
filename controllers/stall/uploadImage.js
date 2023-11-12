const { ref, getDownloadURL } = require("firebase/storage");
const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { updateImage } = require("../../helpers/updateImage");

const Stalls = require("../../models/Stalls");
const { storage } = require("../../firebase/firebaseConfig");

const uploadImage = async (req, res) => {
    console.log("Upload Image Stall");

    let { idStall } = req.params;
    idStall = parseInt(idStall);
    if (isNaN(idStall) || !Number.isInteger(idStall) || idStall < 0) {
        return responseMsg(res, 400, 'Fail', "the idStall should be an integer", {});
    }
    
    const stall = await Stalls.findOne({where: { id: idStall }})
    if(!stall){
        return responseMsg(res, 400, "Fail", "Not valid Stall id", {
        stall
        });
    }

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    if(!req.file){
        return responseMsg(res, 400, 'Fail', "No file uploaded", {});
    }
    const image = req.file;
    const extension = image.mimetype.split('/')[1];
    const path =  `stalls/${idStall}.${extension}`;

    await updateImage(image,path);
    
    const fileRef = ref(storage, path);
    const imageUrl = await getDownloadURL(fileRef);
    
    stall.image_url = imageUrl;
    await stall.save();

    return responseMsg(res, 200, 'success', "Bravo", {});
};

module.exports = {
    uploadImage,
};
