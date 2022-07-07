import styles from "./Project.module.css";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";

const Project = ({ project }) => {
  dayjs.locale("fr");
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${getAssetURL(project.featured_image.id).toString()})`, objectFit: "contain" }}
    >
      <h3>{project.name}</h3>
      <div className={styles.infos}>
        <span>{dayjs(project.created_at).format("DD MMMM YYYY", "fr").toUpperCase()}</span>
        <span className={styles.author}>
          <div className={styles.avatar}>
            <Image src={getAssetURL(project.author.avatar)} alt="" layout="fill" objectFit="contain" />
          </div>
          {project.author.first_name} {project.author.last_name}
        </span>
      </div>
      <hr />
    </div>
  );
};

export default Project;
