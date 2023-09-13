const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json({ msg: "Not authorized. No token" });

  if (req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ msg: "Wrong or expired token" });
      else {
        req.user = data; // an object with only the user.id and user.isAdmin
        next();
      }
    });
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json({ msg: "Not authorized. No token" });

  if (req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "token");
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ msg: "Wrong or expired token" });
      else {
        if (!data.isAdmin) {
          return res.status(401).json({ msg: "You are not admin" });
        }
        req.user = data; // an object with only the user.id and user.isAdmin
        next();
      }
    });
  }
};

module.exports = { verifyToken, verifyTokenAdmin };
