const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin } = require("../controllers/auth/authLogin");
const { authRegister } = require("../controllers/auth/authRegister");
const { authUpdate } = require("../controllers/auth/authUpdate");
const { authDelete } = require("../controllers/auth/authDelete");
const { validateParams } = require("../helpers/validateParams");

const router = Router();
router.post(
  "/login",
  [
    check("email", "You should include a valid email").isEmail().notEmpty(),
    check("password", "You should include a password").notEmpty(),
    validateParams,
  ],
  authLogin
);

router.post(
  "/registerClient",
  [
    check("email", "You should include a valid email").isEmail().notEmpty(),
    check("username", "You should include a username").notEmpty(),
    check("password", "You should include a password").notEmpty(),
    check("username", "You should include a username").notEmpty(),
    check("rol", "You should specify a rol for the user").notEmpty(),
    validateParams,
  ],
  authRegister
);

router.put(
  "/updateClient",
  [
    check("uuid", "You should include a valid email").notEmpty(),
    check("email", "You should include a valid email").isEmail().notEmpty(),
    check("username", "You should include a username").notEmpty(),
    check("password", "You should include a password").notEmpty(),
    check("username", "You should include a username").notEmpty(),
    check("rol", "You should specify a rol for the user").notEmpty(),
    validateParams,
  ],
  authUpdate
);

router.delete(
  "/deleteClient",
  [
    check("uuid", "You should include a valid email").notEmpty(),
    validateParams,
  ],
  authDelete
);

module.exports = router;
