const multer  = require('multer')
const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { getUsersByRol } = require("../controllers/user/getUsersByRol");
const { uploadImage } = require("../controllers/user/uploadImage");
const { updateUser } = require('../controllers/user/updateUser');

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

router.put(
  "/update",
  [
    check("email", "Include the email"),
    check("username", "Include the username"),
    validateParams,
    validateJWT
  ],
  updateUser
)

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
