const express = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  // getSingleUser,
  updateUser,
  login,
  logout,
//   findOneUser,
//   findOrCreateUser,
//   findAndCountUser,
//   restoreUser,
} = require("../controller/user.controller");
const router = express.Router();

router.route("/").post(createUser);
router.route("/").get(getUsers);
// router.route("/findOne/").get(findOneUser);
// router.route("/findOrCreate/").get(findOrCreateUser);
// router.route("/findAndCount").get(findAndCountUser);
// router.route("/:id").get(getSingleUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
// router.route("/restore/:id").post(restoreUser);

router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
