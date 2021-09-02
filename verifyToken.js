const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.jwt;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) return res.redirect("/");
    req.user = decoded;
    console.log(decoded);
    next();
  });
}
module.exports = verifyToken;
