import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Modal from "react-modal";
import { useCreateNoteMutation } from "./notesApiSlice";
import SinglePost from "./SinglePost";

const NewNote = () => {
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("В планах");

  const [isOpen, setIsOpen] = useState(false);

  const [createNote, { isLoading, isSuccess, isError, error }] =
    useCreateNoteMutation();
  const toggleModal =  () => {
    setIsOpen(!isOpen);
  };

  // фокус на инпуте

  const toggleModalClose = async () => {

    await createNote({ title, text, status });

    setIsOpen(false);

    setTitle("");
    setText("");
    setStatus("В планах");
  };

  Modal.setAppElement("#root");
  return (
    <div className="newnote">
      <div className="newnote-click">
        <button className="button" onClick={toggleModal}>
          Новая заметка
        </button>
        <p className="text">
          {isSuccess ? "Заметка успешно создана" : error?.data.message}
        </p>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "calc(50% - 500px/2)",
            bottom: "40px",
            width: "500px",
            height: "300px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <form className="modal">
          <input
            ref={inputRef}
            className="input"
            type="text"
            placeholder="Введите название заметки..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="input"
            type="text"
            placeholder="Введите текст заметки..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select
            className="select"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="В планах">В планах</option>
            <option value="Выполняется">Выполняется</option>
            <option value="Отложено">Отложено</option>
            <option value="Завершено">Завершено</option>
          </select>
          <button className="button" onClick={toggleModalClose}>
            Добавить заметку
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NewNote;
