const jwt = require("jsonwebtoken");

// function verifyToken(req, res, next) {
//   const token = req.cookies.jwt;

//   jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
//     if (err) return res.redirect("/");
//     req.user = decoded;
//     console.log(decoded);
//     next();
//   });

//   // if (isValid) {
//   //   req.user = isValid;
//   //   next();
//   // } else {
//   //   res.redirect("/auth/login");
//   // }
// }

// module.exports = verifyToken;

function auth(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Access Denied");

  const verifield = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  try {
    if (verifield) {
      req.user = verifield;
      next();
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
