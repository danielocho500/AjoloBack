const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const multer = require('multer');
const {extname, join } = require('path');

const Stalls = require("../../models/Stalls")

const UPLOADS_DIRECTORY = join(__dirname, '../../uploads');
const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(UPLOADS_DIRECTORY),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `${fileName}-${Date.now()}${fileExtension}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits: {
        fieldSize: 10000000,
    },
});

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

  

  multerUpload.single('file')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return responseMsg(res, 400, 'Fail', "Error al subir archivo", {});
        } else if (err) {
            return responseMsg(res, 500, 'Fail', "Error interno del servidor", {});
        }

        stall.image_url = req.file.path
        await stall.save()
        // En este punto, la carga del archivo se ha completado con éxito
        return responseMsg(res, 200, "Success", "Imagen subida exitosamente", {
            file: req.file.path
        });
    });
};

module.exports = {
    uploadImage,
};
