const User = require("../models/User");

const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (users.length < 1) {
    return res.status(400).json({ message: "Пользователей нету" });
  }

  res.json(users);
};

const createNewUser = async (req, res) => {
  const { username, password } = req.body;

  // проверка на заполненные поля
  if (!username || !password) {
    return res.status(400).json({ message: "Не все поля заполнены" });
  }

  // проверка на дубликаты
  const dublicate = await User.findOne({ username });

  if (dublicate) {
    return res
      .status(409)
      .json({ message: "Такой пользователь уже существует в БД" });
  }

  const user = await User.create({ username, password });
  if (user) {

    const accessToken = jwt.sign({ username, password }, "token");

    return res
      .status(201)
      .json({ message: "Пользователь успешно создан" ,accessToken  });
  } else {
    return res
      .status(400)
      .json({ message: "Ошибка при создание пользователя" });
  }
};

const updateUser = async (req, res) => {
  const { _id, username, password } = req.body;
  //635a20b945c0215235cdb5e3
  const user = await User.findById({ _id });

  user.username = username;
  user.password = password;
  await user.save();
  res.json({ message: `Пользователь обновлен` });
};

const deleteUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user && password !== user?.password) {
    return res.status(200).json(`Неверный логин или пароль`);
  }

  user.delete();
  return res.status(200).json(`Пользователь ${username} успешно удален`);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
