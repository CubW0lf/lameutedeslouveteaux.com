import { BsChevronRight } from "react-icons/bs";
import styles from "./AccordionItem.module.css";
import { Disclosure } from "@headlessui/react";

const AccordionItem = ({ item }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={styles.question}>
            <span>{item.question}</span>
            <BsChevronRight className={`${open ? styles.chevronActive : styles.chevron}`} />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div
              dangerouslySetInnerHTML={{ __html: item.answer }}
              className={`${open ? styles.answerActive : styles.answer}`}
            ></div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AccordionItem;
