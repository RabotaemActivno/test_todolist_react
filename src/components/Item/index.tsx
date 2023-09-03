import React, { useCallback, useMemo } from "react";
import styles from "./item.module.scss";
import avatarImg from "./Img.svg";
import rectangle from "./Rectangle.svg";
import { faker } from "@faker-js/faker";

type Props = {
  toggleCompleted: (id: string, completed: boolean) => void;
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
};

const generateRandomData = () => {
  const randomStartDate = faker.date.past();
  const randomEndDate = faker.date.between({
    from: randomStartDate,
    to: new Date(),
  });
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDateStart = new Intl.DateTimeFormat("en-US", options).format(
    randomStartDate
  );
  const formattedDateEnd = new Intl.DateTimeFormat("en-US", options).format(
    randomEndDate
  );
  const randomDescription = faker.lorem.sentence();
  const randomTags = [faker.lorem.word(), faker.lorem.word()];

  return {
    formattedDateStart,
    formattedDateEnd,
    randomDescription,
    randomTags,
  };
};

const Item = ({ todo, toggleCompleted }: Props) => {

  

  const {
    formattedDateStart,
    randomDescription,
    randomTags,
    formattedDateEnd,
  } = useMemo(() => generateRandomData(), []);


  return (
    <div className={styles.item}>
      <div className={styles.todo_title}>
        <p>
          <input
            type="checkbox"
            onChange={() => toggleCompleted(todo.id, todo.completed)}
            checked={todo.completed}
          />
          {todo.title}
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.date}>
          <span className={styles.data_start}>{formattedDateStart}</span>
          <span className={styles.data_finish}>{formattedDateEnd}</span>
        </div>
        <div className={styles.description}>{randomDescription}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.tags}>
          <div className={styles.purple}>{randomTags[0]}</div>
          <div className={styles.grey}>
            {randomTags[1]}
            <img className={styles.rectangle} src={rectangle} alt="rectangle" />
          </div>
        </div>
        <div className={styles.avatar}>
          <img src={avatarImg} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Item;
