import styles from "./Member.module.css";
import getAssetsURL from "../../directus/getAssets";
import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";

const Member = ({ member = null }) => {
  return (
    <div className={styles.member}>
      {member !== null && (
        <>
          <div className={styles.avatar}>
            <div className={styles.top} style={{ backgroundColor: member.color }}></div>
            <div className={styles.imageContainer}>
              {member.avatar && (
                <Image src={getAssetsURL(member.avatar.id)} layout="responsive" width="200" height="200" alt="" />
              )}
            </div>
          </div>
          <div className={styles.infos}>
            <p className={styles.name}>
              {member.first_name} {member.last_name}
            </p>
            {member.manifest && (
              <>
                <span>[...]</span>
              </>
            )}
            {member.link && (
              <a href={member.link} target="_blank" rel="noreferrer" className={styles.icon}>
                <AiOutlineLink className={styles.link} />
              </a>
            )}
            <p className={styles.location}>{member.location}</p>
          </div>
          <div className={styles.bottom} style={{ backgroundColor: member.color }}>
            <Link href={`membres/${member.id}`}>
              <a>
                <button className={styles.button}>Voir Plus</button>
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Member;
