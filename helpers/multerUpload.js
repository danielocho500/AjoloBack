const multer = require('multer');
const { dirname, extname, join } = require('path');

const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg'];

// Especifica la ruta del directorio de destino de tus archivos subidos
const UPLOADS_DIRECTORY = join(__dirname, '../uploads');

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: UPLOADS_DIRECTORY,
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

module.exports = multerUpload;
