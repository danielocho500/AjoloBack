const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { createEventService } = require("../controllers/events/createEvent");
const { updateEventService } = require("../controllers/events/updateEvent");
const { deleteEventService } = require("../controllers/events/deleteEvent");
const { findEventsByDateService } = require("../controllers/events/getEvents");

const router = Router();

router.get(
  "/find/:date",
  [validateParams, validateJWT],
  findEventsByDateService
);

router.post(
  "/create",
  [validateParams, validateJWT],
  createEventService
);

router.put(
  "/update/:id",
  [validateParams, validateJWT],
  updateEventService
);

router.delete(
  "/delete/:id",
  [validateParams, validateJWT],
  deleteEventService
);


module.exports = router;
