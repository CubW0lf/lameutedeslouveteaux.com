import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import hero from "../public/assets/images/hero.jpg";
import { find } from "../directus/utils";

const Home = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>La Meute des Louveteaux</title>
        <meta name="description" content="Le site de l'association loi de 1901 : La Meute des louveteaux" />
      </Head>

      <div className={styles.hero}>
        <Image src={hero} layout="fill" objectFit="cover" placeholder="blur" alt="" />
      </div>
      <main className={styles.main}>
        <div dangerouslySetInnerHTML={{ __html: data.text }} className={styles.paper}></div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const data = await find("homepage", 1);

  return {
    props: {
      data,
    },
  };
}

export default Home;
