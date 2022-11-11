const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Несанкционированный вход" });

  jwt.verify(token, "token", (err, user) => {
    if (err) return res.status(403).json({ message: "Запрещено " + err });
    
    // передаем данные пользователя из токена как отвтет в следующую функцию
    req.user = user;

    next();
  });
};

module.exports = verifyJWT;
