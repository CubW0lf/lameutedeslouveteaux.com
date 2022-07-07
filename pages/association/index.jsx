import Head from "next/head";
import Image from "next/image";
import Title from "../../components/Title/Title";
import hero from "../../public/assets/images/forest.jpeg";
import styles from "../../styles/Infos.module.css";
import { FaYoutube, FaFacebookF, FaDiscord } from "react-icons/fa";

const Infos = () => {
  return (
    <>
      <Head>
        <title>Informations</title>
        <meta name="description" content="Les documents officiels, les réseaux, et d'autres infos" />
      </Head>
      <div className={styles.container}>
        <Title text="Informations" />
        <div className={styles.hero}>
          <div className={styles.quote}>
            <q> LÀ OÙ LES IDÉES SE RENCONTRENT, NAISSENT LES GRANDS PROJETS.</q>
            <cite>Un Nain Connu</cite>
          </div>
          <div className={styles.socials}>
            <div className={styles.network}>
              <FaYoutube />
              <span>
                You
                <br />
                Tube
              </span>
            </div>
            <div className={styles.network}>
              <FaFacebookF />
              <span>
                Face
                <br />
                Book
              </span>
            </div>
            <div className={styles.network}>
              <FaDiscord />
              <span>
                Dis
                <br />
                Cord
              </span>
            </div>
          </div>
          <Image src={hero} alt="" layout="fill" objectFit="cover" placeholder="blur" />
        </div>
        <div className={styles.document}>
          <ul>
            <li>Statuts</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Infos;
