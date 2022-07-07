// import React from "react";
import { useEffect, useState } from "react";
import getAssetURL from "../../directus/getAssets";
import Image from "next/image";
import styles from "./PopUp.module.css";

const PopUp = ({ data }) => {
  const [display, setDisplay] = useState(true);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <div className={`${styles.popup} ${transition ? styles.active : ""}`}>
      <div className={styles.wrapper}>
        <div className={display ? styles.bubble : styles.hidden}>
          <h3>{data.avatar.name}</h3>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
        </div>
        <div className={styles.avatar} onClick={() => setDisplay(!display)}>
          <Image src={getAssetURL(data.avatar.image)} width="1000" height="1000" layout="responsive" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
