import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { useUpdateNoteMutation } from "./notesApiSlice";

const SinglePost = ({ currentNote, onClickSingle,data }) => {
  const [display, setDisplay] = useState("None");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [checked, setChecked] = useState(false);

  const isOpen = currentNote.isOpen;
  const note = data.filter(el=>el._id === currentNote.id)[0]

  useEffect(() => {
    if (checked) {
      setDisplay("Block");
      setTitle(note?.title);
      setText(note?.text);
      setStatus(note?.status);
    } else {
      setDisplay("None");
    }
  }, [checked]);

  const [updateNote] = useUpdateNoteMutation();

  const editHandler = async () => {
    await updateNote({ id: note._id, title, text, status });
  };

  const closeHandler = ()=>{
    setChecked(false);
    onClickSingle(null);
  }

  if (!note) return;
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeHandler}
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
      <div className="singlenote">
        <h1 className="title"> {note.title}</h1>
        <div className="text"> {note.text}</div>
        <div className="status">Статус: {note.status}</div>
        <div className="date">
          Дата создания : {moment(note.createdAt).format("YYYY-MM-DD HH:mm ")}
        </div>
        <div className="date">
          Дата Редактирования :{" "}
          {moment(note.updatedAt).format("YYYY-MM-DD HH:mm ")}
        </div>

        <input
          checked={checked}
          onChange={() => setChecked(!checked)}
          type="checkbox"
        />
        <button onClick={editHandler}>Отправить</button>

        <div className="edit" style={{ display: display }}>
          <input
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
            value={status}
            className="select"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="В планах">В планах</option>
            <option value="Выполняется">Выполняется</option>
            <option value="Отложено">Отложено</option>
            <option value="Завершено">Завершено</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default SinglePost;
