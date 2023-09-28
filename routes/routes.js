const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const isAuthenticated = require("../middleware/isAuth");

router.get("/", controllers.gethello);
router.post("/login", controllers.login);
router.post("/signup", controllers.signup);
router.post("/property", isAuthenticated, controllers.propertyInsertion);
router.post(
  "/update-my-property",
  isAuthenticated,
  controllers.propertyUpdation
);
router.post(
  "/delete-my-property",
  isAuthenticated,
  controllers.propertyDeletion
);
router.get("/list-properties", controllers.getAllPropertyReports);
router.get(
  "/get-my-property",
  isAuthenticated,
  controllers.getUserPropertyDetails
);
module.exports = router;
