import Member from "../../../components/Member/Member";
import Title from "../../../components/Title/Title";
import styles from "../../../styles/Membres.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAll } from "../../../directus/utils";

const Membres = ({ data }) => {
  const [members, setMembers] = useState();
  useEffect(() => {
    setMembers(data);
  }, [data]);
  return (
    <>
      <Head>
        <title>Membres de l&apos;Association</title>
        <meta
          name="description"
          content="Tous les membres de l'association, leurs manifestes et quelques infos sur chacun"
        />
      </Head>
      <div className={styles.membres}>
        <Title text="Membres" />
        <div className={styles.container}>{members && members.data.map((m) => <Member member={m} key={m.id} />)}</div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const data = await getAll("asso_member");

  return {
    props: {
      data,
    },
  };
}

export default Membres;
