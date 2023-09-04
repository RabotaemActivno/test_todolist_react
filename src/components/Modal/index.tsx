import React, { useState } from "react";
import styles from "./modal.module.scss";

type Props = {
    activeModal: boolean;
    setActiveModal: (flag: boolean) => void
}


const Modal = ({activeModal, setActiveModal}: Props) => {

    const onCancelClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault()
        setActiveModal(false)
    }

  return (
    <div className={activeModal ? styles.modal : styles.modal_disabled}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <form className={styles.form}>
            <input type="text" placeholder="title" />
            <input type="text" placeholder="description" />
            <input className={styles.input_date} type="datetime-local" />
            <div className={styles.button_wrapper}>
              <button onClick={onCancelClickHandler}>Cancel</button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
