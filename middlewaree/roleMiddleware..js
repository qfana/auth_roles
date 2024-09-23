const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

module.exports = (req, res, next) => {
  if (req.method === "OPIONS") {
    next();
  }

  try {

    const token = req.headers.autorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "You don't login" });
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();

  } catch (e) {
    return res.status(403).json({ message: "You don't login" });
  }

};