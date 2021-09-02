const router = require("express").Router();
const verifyToken = require("../verifyToken");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", verifyToken, (req, res) => {
  if (verifyToken) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
