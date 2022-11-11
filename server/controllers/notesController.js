const Note = require("../models/Note");
const User = require("../models/User");

const getAllNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).lean();

  if (notes.length < 1)
    return res.status(401).json({ message: "Посты отсутсвуют" });

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findOne({ username: req.user.username }).lean();
      return { ...note, user: user.username };
    })
  );

  return res.status(200).json({ message: notesWithUser });
};

const createNote = async (req, res) => {
  // принимает имя пользователя
  const { title, text, status } = req.body;

  const user = await User.findOne({ username: req.user.username }).exec();

  if (!user || !title || !text || !status) {
    return res.status(401).json({ message: "Не все поля заполнены" });
  }

  // проверяем есть ли заметка с таким же заголовком
  const duplicate = await Note.findOne({ title, user: user })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Пост с таким заголовком уже существует" });
  }

  // создаем новую заметку
  const note = await Note.create({ user: user._id, title, text, status });

  if (note) {
    return res.status(200).json({ message: "Заметка успешно создана" });
  } else {
    return res.status(400).json({ message: "Ошибка при создание заметки" });
  }
};

const updateUser = async (req, res) => {
  const { id, title, text, status } = req.body;

  if (!id || !title || !text || !status) {
    return res.status(401).json({ message: "Не все поля заполнены" });
  }

  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "Заметка не найдена" });
  }

  // проверяем есть ли заметка с таким же заголовком у данного пользователя, кроме текущей
  const duplicate = await Note.findOne({ title, user: req.user.id })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
    console.log(duplicate);
  if (duplicate._id.toString() !== id) {
    return res
      .status(409)
      .json({ message: "Пост с таким заголовком уже существует", duplicate });
  }

  note.title = title;
  note.text = text;
  note.status = status;

  const updateNote = await note.save();

  // res.json(`Заметка ${updatedNote.title} обновлена`);
  res.json(updateNote);
};

const deleteNotes = async (req, res) => {
  const { title } = req.body;
  const note = await Note.findOne({ title });

  note.delete();

  res.status(200).json({ message: `Заметка ${title} успешно удалена` });
};

module.exports = { getAllNotes, createNote, updateUser, deleteNotes };
