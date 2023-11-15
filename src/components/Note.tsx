import { INote } from "@/libs/interfaces";
import React, { useState } from "react";
import styles from "./Components.module.css";
import { Modal } from "@mui/material";
import NoteModal from "./NoteModal";

const Note: React.FC<INote> = (props) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)}>
        <div className={styles.Note_modal}>
          <NoteModal {...props} setModal={setModal} />
        </div>
      </Modal>
      <article onClick={() => setModal(true)} className={styles.Note}>
        <div className={styles.Note_titleContainer}>
          <p>
            {props.title.length > 33
              ? props.title.slice(0, 33) + "..."
              : props.title}
          </p>
        </div>
        <div className={styles.Note_contentContainer}>
          <p>
            {props.content.length > 90
              ? props.content.slice(0, 117) + "..."
              : props.content}
          </p>
        </div>
        <div className={styles.Note_createdAtContainer}>
          <span className={styles.Note_createdAt}>
            Created at{" "}
            {props.create_date.slice(0, props.create_date.length - 3)}
          </span>
        </div>
      </article>
    </>
  );
};

export default Note;
