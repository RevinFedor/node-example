const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Не все поля заполнены" });
  }

  const findUser = await User.findOne({ username });


  if (!findUser) {
    return res.status(400).json({ message: "Пользоатель не найдет" });
  }

  const accessToken = jwt.sign({ username, password, id:findUser._id }, "token");

  res.json({accessToken});
};

module.exports = { login };
