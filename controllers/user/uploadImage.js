const { ref, getDownloadURL } = require("firebase/storage");
const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { updateImage } = require("../../helpers/updateImage");

const { storage } = require("../../firebase/firebaseConfig");
const User = require("../../models/User");

const uploadImage = async (req, res) => {
    console.log("Upload Image User");

    let { uuid } = req.params;
    
    const user = await User.findOne({where: { uuid }})
    if(!user){
        return responseMsg(res, 400, "Fail", "Not valid uuid", {});
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
    const path =  `users/${uuid}.${extension}`;

    await updateImage(image,path);
    
    const fileRef = ref(storage, path);
    const imageUrl = await getDownloadURL(fileRef);
    
    user.image_url = imageUrl;
    await user.save();

    return responseMsg(res, 200, 'success', "Bravo", {});
};

module.exports = {
    uploadImage,
};
