import styles from "../../styles/MyProjects.module.css";
import { getAllBy } from "../../directus/utils";
import { useEffect, useState } from "react";
import Project from "../../components/Project/Project";
import ProfileAside from "../../components/ProfileAside/ProfileAside";

const MyProjects = () => {
  const [projects, setProjects] = useState();

  useEffect(() => {
    getAllBy("project", {
      fields: ["*.*"],
      filter: {
        author: {
          _eq: "$CURRENT_USER",
        },
      },
    })
      .then((response) => setProjects(response))
      .catch((error) => error);
  }, []);
  return (
    <div className={styles.wrapper}>
      <ProfileAside />
      <main className={styles.main}>
        <h1>Mes Projets</h1>
        <div className={styles.container}>{projects && projects.data.map((p) => <Project key={p.id} project={p} />)}</div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default MyProjects;
