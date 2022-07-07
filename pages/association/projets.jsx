import Head from "next/head";
import Title from "../../components/Title/Title";
import styles from "../../styles/Projets.module.css";
import hero from "../../public/assets/images/projects.jpeg";
import Image from "next/image";
import { find, getAll } from "../../directus/utils";
import Popup from "../../components/PopUp/PopUp";
import Project from "../../components/Project/Project";
import { useUxContext } from "../../contexts/uxContext";

const Projets = ({ popup, projects }) => {
  const { isAuthenticated } = useUxContext();
  return (
    <>
      <Head>
        <title>Les Projets</title>
        <meta name="description" content="Tous les projets des membres, classés par catégorie" />
      </Head>
      <div className={styles.container}>
        <Title text="Projets" />
        <div className={styles.hero}>
          <h1>Carte Blanche</h1>
          <Image src={hero} alt="" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.projets}>
          {isAuthenticated
            ? projects.data.length !== 0
              ? projects.data.map((p) => <Project key={p.id} project={p} />)
              : "Pas de Projets à afficher"
            : "Connectez vous pour voir les projets"}
        </div>
      </div>
      <Popup data={popup} />
    </>
  );
};

export async function getStaticProps() {
  const popup = await find("popup", 2);
  const projects = await getAll("project");
  return {
    props: {
      popup: popup,
      projects: projects,
    },
  };
}

export default Projets;
