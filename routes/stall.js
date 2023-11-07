const multer  = require('multer')
const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { getStallTypes } = require("../controllers/stall/getStallTypes");
const { createStall } = require("../controllers/stall/createStall");
const { getStalls } = require("../controllers/stall/getStalls");
const { getStall } = require("../controllers/stall/getStall");
const { uploadImage } = require("../controllers/stall/uploadImage");


const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
router.post(
  "/create",
  [
    check("id_stall_type","You should include the id of the stall, between 1-2").notEmpty().isInt({min: 1, max: 2}),
    check("name", "Include the name of the stall").notEmpty(),
    check("description", "Include the description of the stall").notEmpty(),
    check("cost", "Include the cost of the stall, in ajolocoins").notEmpty().isFloat({ min: 0 }),
    check("minimun_height_cm", "Include the minimun height in cm").notEmpty().isFloat({ min: 0 }),
    check("uuid_employeer", "You should include the uuid of the employeer").notEmpty(),
    validateParams,
    validateJWT
  ],
  createStall
);

router.get(
    "/types",
    [
        validateParams,
        validateJWT
    ],
    getStallTypes
)

router.get(
    "/",
    [
        validateParams,
        validateJWT
    ],
    getStalls
)

router.get(
  "/:idStall",
  [
    validateParams,
    validateJWT
  ],
  getStall
)

router.post(
  "/image/:idStall",
  [
    validateParams,
    validateJWT,
    upload.single('file')
  ],
  uploadImage
);

module.exports = router;
