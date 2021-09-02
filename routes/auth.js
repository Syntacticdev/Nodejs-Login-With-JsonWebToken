const jwt = require("jsonwebtoken");
const router = require("express").Router();
const cookie = require("cookie-parser");

const Users = [
  {
    id: 1,
    username: "syncone",
    email: "sync@mail.com",
    password: "12345",
  },
  {
    id: 2,
    username: "hifeoluwacool",
    email: "hifeoluwacool@gmail.com",
    password: "123456",
  },
];
router.get("/test", (req, res) => {
  const { id } = Users;
  console.log(Users[1].id);
});
router.get("/signup", (req, res) => {
  jwt.sign(user, process.env.JWT_PRIVATE_KEY, (err, token) => {
    if (err) throw err;
    res.json(token);
  });
});

router.get("/decode", (req, res) => {
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzeW5jb25lIiwiZW1haWwiOiJzeW5jQG1haWwuY29tIiwiaWF0IjoxNjI1NjAxNjk3fQ.wz9-lvW37PJUgMgy0qe3nDvc43D_1B3PpnOwUI-zBMM",
    process.env.JWT_PRIVATE_KEY,
    (err, decode) => {
      res.json({ details: decode });
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash("error_msg", "All Input Fields is required");
    res.redirect("/");
    return false;
  }

  const user = Users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  if (!user) {
    req.flash("error_msg", "Invalid account");
    res.redirect("/");
    return false;
  }

  const isMatched = user.password === password;
  try {
    if (isMatched) {
      jwt.sign(
        user,
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 60 },
        (err, token) => {
          if (err) throw err;

          res.cookie("jwt", token);
          res.redirect("/profile");
        }
      );
    } else {
      req.flash("error_msg", "Incorrect password");
      res.redirect("/");
      // res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/logout", (req, res) => {
  //res.cookie("jwt", "");
  res.clearCookie("jwt");
  res.redirect("/");
});
module.exports = router;
