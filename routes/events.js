const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { createEventService } = require("../controllers/events/createEvent");

const router = Router();
router.post(
  "/create",
  [validateParams, validateJWT],
  createEventService
);

module.exports = router;
