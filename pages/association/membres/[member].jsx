import React from "react";
import Title from "../../../components/Title/Title";
import Link from "next/link";
import Head from "next/head";
import { find, getAll } from "../../../directus/utils";
import getAssetURL from "../../../directus/getAssets";
import Image from "next/image";
import styles from "../../../styles/Membre.module.css";

const MembreSingle = ({ member = null }) => {
  return (
    <>
      <Head>
        <title>{member !== null ? member.first_name : "Membre de l'Association"}</title>
        <meta name="description" content="Infos détaillés sur les membres" />
      </Head>
      {member !== null && (
        <div className={styles.container}>
          <Title text={member.first_name} />
          <div className={styles.wrapper}>
            <div className={styles.infos}>
              <div className={styles.avatar}>
                <Image src={getAssetURL(member.avatar.id)} layout="responsive" width="200" height="200" alt="" />
              </div>
              <p className={styles.name}>
                {member.first_name} {member.last_name}
              </p>
              <p className={styles.location}>{member.location}</p>
              <div dangerouslySetInnerHTML={{ __html: member.quote }} className={styles.quote}></div>
            </div>
            <div className={styles.bio}>
              <div dangerouslySetInnerHTML={{ __html: member.manifest }} className={styles.text}></div>
              <Link href="/association/membres">
                <a>
                  <button>Retour Aux Membres</button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps(context) {
  const id = context.params.member;
  const member = await find("asso_member", id);
  return {
    props: {
      member,
    },
  };
}

export async function getStaticPaths() {
  const members = await getAll("asso_member");

  const paths = members.data.map((item) => ({
    params: { member: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default MembreSingle;
