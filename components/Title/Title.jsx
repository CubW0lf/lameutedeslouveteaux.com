import styles from "./Title.module.css";

const Title = ({ text }) => {
  return (
    <div className={styles.title}>
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
