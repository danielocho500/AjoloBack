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
    validateParams,
  ],
  authRegisterClient
);

router.post(
  "/registerAnUser",
  [
    check("email", "You should include a valid email").isEmail().notEmpty(),
    check("username", "You should include a username").notEmpty(),
    check("password", "You should include a password").notEmpty(),
    check("id_rol","You should include the id of the new user rol").notEmpty().isAlphanumeric().custom((value) => {
      if (value !== 3 && value !== 4) {
        throw new Error("id_rol must be 3 for Employeer or 4 for Attendant");
      }
      return true;
    }),
    validateParams,
    validateJWT
  ],
  authRegisterUser
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
  "/deleteClient/:uuid",
  [
    check("uuid", "You should include a valid email").notEmpty(),
    validateParams,
  ],
  authDelete
);

module.exports = router;
