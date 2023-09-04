import { type } from "os";
import styles from "./header.module.scss";

type Props = {
  quantity: number;
  setActiveModal: (flag: boolean)=> void
}

const TheHeader = ({ quantity, setActiveModal }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flex_item_left}>Today</div>
      <div className={styles.flex_item_right}>
        <button className={styles.addButton} onClick={()=>setActiveModal(true)}>+</button>
        <div className={styles.counter}>
          <span>{quantity}</span>
        </div>
      </div>
    </header>
  );
};

export default TheHeader;
