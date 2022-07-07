import { useState } from "react";
import styles from "../../styles/Avatars.module.css";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import { useUxContext } from "../../contexts/uxContext";
import Head from "next/head";
import Flash from "../../components/Flash/Flash";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import { getAll, updateMe } from "../../directus/utils";

const Avatars = ({ avatars }) => {
  const { flash, flashType, handleFlash } = useUxContext();

  const [selected, setSelected] = useState(null);

  const changeAvatar = async () => {
    await updateMe({ avatar: selected.image })
      .then(() => handleFlash("success", "Votre avatar a bien été changé", 3000))
      .catch((err) => handleFlash("error", err.message, 3000));
  };

  return (
    <>
      <Head>
        <title>Changement Avatar</title>
        <meta name="description" content="Changement de l'avatar grace aux formulaires et aux goodies images proposés" />
      </Head>
      <div className={styles.container}>
        <ProfileAside />
        <div className={styles.selector}>
          <div className={styles.avatars}>
            {avatars &&
              avatars.data.map((a) => (
                <div
                  key={a.id}
                  className={selected === a ? styles.avatarSelected : styles.avatar}
                  onClick={() => setSelected(a)}
                >
                  <div className={styles.imageContainer}>
                    <Image src={getAssetURL(a.image.id)} width="1000" height="1000" layout="responsive" alt="" />
                  </div>
                  <p>{a.name}</p>
                </div>
              ))}
          </div>
          <button onClick={changeAvatar}>Je Choisi</button>
          {selected && (
            <>
              <div className={styles.selectedContainer}>
                <div className={styles.selectedImage}>
                  <Image src={getAssetURL(selected.image.id)} width="1000" height="1000" layout="responsive" alt="" />
                </div>
                <p>{selected.name}</p>
              </div>
            </>
          )}
          {flash && <Flash type={flashType} text={flash} />}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const avatars = await getAll("avatar");

  return {
    props: {
      avatars,
      protected: true,
    },
  };
}

export default Avatars;
