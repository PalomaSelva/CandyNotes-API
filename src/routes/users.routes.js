const { Router } = require("express");

const multer = require("multer");

const UsersController = require("../controller/usersController");
const UserAvatarController = require("../controller/UserAvatarController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const usersRoutes = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes; // Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js
