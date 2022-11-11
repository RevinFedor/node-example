const express = require("express");
const notesController = require("../controllers/notesController");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.use(verifyJWT);

router.route("/").get(notesController.getAllNotes);
router.route("/").post(notesController.createNote);
router.route("/").patch(notesController.updateUser);
router.route("/").delete(notesController.deleteNotes);

module.exports = router;
