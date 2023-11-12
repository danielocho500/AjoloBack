const { storage } = require("../firebase/firebaseConfig");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const updateImage = async (image, url) => {
    const storage = getStorage();
    const storageRef = ref(storage, url );

    const metadata = {
        contentType: image.mimetype
    };

    const result = await uploadBytes(storageRef, image.buffer, metadata);
    return result
};

module.exports = {
    updateImage,
}