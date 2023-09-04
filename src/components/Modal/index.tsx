import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./modal.module.scss";

type Props = {
  activeModal: boolean;
  setActiveModal: (flag: boolean) => void;
  addTodo: (newTodo: InputType) => void
};

export type InputType = {
  title: string;
  description: string;
  date: string;
};

const Modal = ({ activeModal, setActiveModal, addTodo }: Props) => {
  
  const [errorField, setErrorField] = useState<boolean>(false);
  const [input, setInput] = useState<InputType>({
    title: "",
    description: "",
    date: "",
  });


  const onCancelClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setInput({ title: "", description: "", date: "" });
    setActiveModal(false);
    setErrorField(false)
  };

  const onChangeInputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setErrorField(false);
    setInput((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.title && input.description && input.date) {
      await addTodo(input)
      setActiveModal(false);
      setInput({ title: "", description: "", date: "" })
    } else {
      setErrorField(true);
    }
  };

  return (
    <div className={activeModal ? (styles.modal) : styles.modal_disabled}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder="title"
              value={input.title}
              onChange={(e) => onChangeInputHandler(e, "title")}
            />
            <input
              type="text"
              placeholder="description"
              value={input.description}
              onChange={(e) => onChangeInputHandler(e, "description")}
            />
            <input
              className={styles.input_date}
              type="datetime-local"
              value={input.date}
              onChange={(e) => onChangeInputHandler(e, "date")}
            />
            <div className={styles.button_wrapper}>
              <button onClick={onCancelClickHandler}>Cancel</button>
              <button type="submit">Add</button>
            </div>
            {errorField && <div className={styles.errorMessage}>Fill in all the fields</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
