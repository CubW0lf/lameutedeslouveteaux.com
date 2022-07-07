import React from "react";
import AccordionItem from "../components/AccordionItem/AccordionItem";
import Title from "../components/Title/Title";
import styles from "../styles/Faq.module.css";
import Head from "next/head";
import PopUp from "../components/PopUp/PopUp";
import { find, getAll } from "../directus/utils";

const Faq = ({ questions, popup }) => {
  return (
    <>
      <Head>
        <title>Foire Aux Questions</title>
        <meta
          name="description"
          content="Les questions les plus évidentes n'ont parfois pas de réponses évidentes. On essaye de vous expliquer un maximum de choses ici."
        />
      </Head>
      <div className={styles.faq}>
        <Title text="Foire aux Questions" />
        <div className={styles.wrapper}>
          <h2>LA MEUTE DES LOUVETEAUX</h2>
          <h3>ASSOCIATION LOI DE 1901</h3>
          <div className="faq-container">
            {questions.data.map((f) => (
              <AccordionItem item={f} key={f.id} />
            ))}
          </div>
        </div>
        <PopUp data={popup} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const questions = await getAll("faq");

  const popup = await find("popup", 1);

  return {
    props: {
      questions,
      popup,
    },
  };
}

export default Faq;
