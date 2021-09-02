const router = require("express").Router();
const verifyToken = require("../verifyToken");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", verifyToken, (req, res) => {
  res.render("profile", { username: req.user.username, email: req.user.email });
});

module.exports = router;
