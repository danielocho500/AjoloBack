const multer  = require('multer')
const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { getUsersByRol } = require("../controllers/user/getUsersByRol");
const { uploadImage } = require("../controllers/user/uploadImage");

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
router.get(
  "/getByRole",
  [
    check("id_rol","You should include the id of the role, between 1-4").notEmpty().isInt({min: 1, max: 4}),
    validateParams,
    validateJWT
  ],
  getUsersByRol
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
