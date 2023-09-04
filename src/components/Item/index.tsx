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
    date?: string;
    description?: string;
  };
};

const options: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const generateRandomData = () => {
  const randomStartDate = faker.date.past();
  const randomEndDate = faker.date.between({
    from: randomStartDate,
    to: new Date(),
  });
  const randomDescription = faker.lorem.sentence();
  const randomTags = [faker.lorem.word(), faker.lorem.word()];

  return {
    randomStartDate,
    randomEndDate,
    randomDescription,
    randomTags,
  };
};

const formatDate = (dateOrString?: string | Date) => {
  if (dateOrString) {
    const date =
      typeof dateOrString === "string" ? new Date(dateOrString) : dateOrString;
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  const currentDate = new Date();
  return new Intl.DateTimeFormat("en-US", options).format(currentDate);
};

const Item = ({ todo, toggleCompleted }: Props) => {
  const { randomStartDate, randomDescription, randomTags, randomEndDate } =
    useMemo(() => generateRandomData(), []);

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
          <span className={styles.data_start}>
            {todo.date ? formatDate(new Date()) : formatDate(randomStartDate)}
          </span>
          <span className={styles.data_finish}>
            {todo.date ? formatDate(todo.date) : formatDate(randomEndDate)}
          </span>
        </div>
        <div className={styles.description}>
          {todo.description ? todo.description : randomDescription}
        </div>
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
