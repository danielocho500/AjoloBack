const multer  = require('multer')
const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { getUsersByRol } = require("../controllers/user/getUsersByRol");
const { getEmployeers } = require("../controllers/user/getEmployeers")
const { uploadImage } = require("../controllers/user/uploadImage");
const { getStream } = require('firebase/storage');

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
router.get(
  "/getByRole/:id_rol",
  [
    validateParams,
    validateJWT
  ],
  getUsersByRol
);

router.get(
  "/employeers",
  [
    validateParams,
    validateJWT
  ],
  getEmployeers
);

router.post(
  "/image/:uuid",
  [
    validateParams,
    validateJWT,
    upload.single('file')
  ],
  uploadImage
);

module.exports = router;
