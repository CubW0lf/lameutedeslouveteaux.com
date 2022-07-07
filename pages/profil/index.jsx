import Head from "next/head";
import Image from "next/image";
import { useUxContext } from "../../contexts/uxContext";
import getAssets from "../../directus/getAssets";
import Flash from "../../components/Flash/Flash";
import UserForm from "../../components/UserForm/UserForm";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import styles from "../../styles/Profile.module.css";

const Profil = () => {
  const { flash, flashType, currentUser, setCurrentUser } = useUxContext();

  return (
    <>
      <Head>
        <title>Profil de {currentUser && currentUser.first_name}</title>
        <meta name="description" content="Toutes les infos qui vous concernent" />
      </Head>
      <div className={styles.container}>
        {currentUser && (
          <>
            <ProfileAside />
            <section>
              <h1 className={styles.name}>
                {currentUser.last_name && currentUser.last_name} {currentUser.first_name && currentUser.first_name}
              </h1>
              <div className={styles.wrapper}>
                <div className={styles.infos}>
                  <div className={styles.avatar}>
                    {currentUser.avatar && (
                      <Image width="1000" height="1000" src={getAssets(currentUser.avatar)} layout="responsive" alt="" />
                    )}
                  </div>

                  <div className={styles.text}>
                    <p>{currentUser.role && currentUser.role.name}</p>
                    <p>{currentUser.title && currentUser.title}</p>
                  </div>
                </div>
                <UserForm user={currentUser} setCurrentUser={setCurrentUser} />
              </div>
            </section>
          </>
        )}
        {flash && <Flash type={flashType} text={flash} />}
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Profil;
