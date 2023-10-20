const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin } = require("../controllers/auth/authLogin");
const { authRegisterClient } = require("../controllers/auth/authRegisterClient");
const { authRegisterUser } = require("../controllers/auth/authRegisterUser")
const { authUpdate } = require("../controllers/auth/authUpdate");
const { authDelete } = require("../controllers/auth/authDelete");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");

const router = Router();
router.get(
  "/generate",
  [
    validateParams,
  ],
  authLogin
);

module.exports = router;
