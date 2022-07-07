import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import styles from "./AccordionItem.module.css";

const AccordionItem = ({ item }) => {
  const [toggleItem, SetToggleItem] = useState(false);

  return (
    <div className={styles.item}>
      <div className={styles.question} onClick={() => SetToggleItem(!toggleItem)}>
        {item.question}
        {toggleItem ? (
          <BsChevronRight className={toggleItem ? styles.chevronActive : styles.chevron} />
        ) : (
          <BsChevronRight className={toggleItem ? styles.chevronActive : styles.chevron} />
        )}
      </div>
      <div
        className={toggleItem ? styles.answerActive : styles.answer}
        dangerouslySetInnerHTML={{ __html: item.answer }}
      ></div>
    </div>
  );
};

export default AccordionItem;
