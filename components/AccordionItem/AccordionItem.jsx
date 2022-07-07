import { BsChevronRight } from "react-icons/bs";
import styles from "./AccordionItem.module.css";
import { Disclosure } from "@headlessui/react";
import { Transition } from "@headlessui/react";

const AccordionItem = ({ item }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={styles.question}>
            <div className={styles.questionContainer}>
              <span>{item.question}</span>
              <BsChevronRight className={`${open ? styles.chevronActive : styles.chevron}`} />
            </div>
          </Disclosure.Button>
          <Transition
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <Disclosure.Panel>
              <div dangerouslySetInnerHTML={{ __html: item.answer }} className={styles.answer}></div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default AccordionItem;
