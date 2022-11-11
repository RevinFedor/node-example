import React, { useState } from "react";
import NewNote from "./NewNote";
import { useDeleteNoteMutation, useGetNotesQuery } from "./notesApiSlice";
import moment from "moment";
import SinglePost from "./SinglePost";

const NotesList = () => {
  const [currentNote, setCurrentNote] = useState({ isOpen: false, id: null });

  const { data, isSuccess, isLoading, isError, error } = useGetNotesQuery();

  const [deleteNote] = useDeleteNoteMutation();

  const deleteHandler = (title) => {
    deleteNote({ title });
  };

  // открывается модальное окно
  const onClickSingle = (id) => {
    setCurrentNote({ isOpen: !currentNote.isOpen, id: id });
  };

  let content;
  let modalWindow;
  if (isLoading) content = <h1>Загрузка... </h1>;
  if (isError) content = <h1>{error.data.message}</h1>;

  if (isSuccess) {
    content = data.message.map((note) => (
      <div className="note" key={note._id}>
        <div onClick={() => onClickSingle(note._id)} className="title">
          Заголовок: {note.title}
        </div>
        <div className="text">Текст: {note.text}</div>
        <div className="status">Статус: {note.status}</div>
        <div className="date">
          Дата создания : {moment(note.createdAt).format("YYYY-MM-DD")}
        </div>
        <button className="button" onClick={() => deleteHandler(note.title)}>
          Удалить
        </button>
      </div>
    ));
    let filter1 = data.message.filter((note) => note.status === "В планах");
    let filter2 = data.message.filter((note) => note.status === "Выполняется");
    let filter3 = data.message.filter((note) => note.status === "Отложено");
    let filter4 = data.message.filter((note) => note.status === "Завершено");
    
    modalWindow = (
      <SinglePost
        currentNote={currentNote}
        onClickSingle={onClickSingle}
        data={data.message}
      />
    );
  }

  return (
    <div className="container">
      <NewNote />
      <div className="noteslist">{content}</div>
      {modalWindow}
    </div>
  );
};

export default NotesList;
