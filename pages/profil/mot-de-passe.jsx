import { useUxContext } from "../../contexts/uxContext";
import { useForm } from "react-hook-form";
import Head from "next/head";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import styles from "../../styles/Password.module.css";
import Flash from "../../components/Flash/Flash";
import { changePassword } from "../../directus/utils";

const Password = () => {
  const { flash, flashType, handleFlash } = useUxContext();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const reset = async (credentials) => {
    await changePassword(credentials.email)
      .then(() => {
        handleFlash("success", "Un email vous a été envoyé, surveillez les boites indésirables, spams.", 3000);
      })
      .catch((err) => handleFlash("error", err.message, 3000));
  };

  return (
    <>
      <Head>
        <title>Reset mot de Passe</title>
        <meta name="description" content="Toutes les infos qui vous concernent" />
      </Head>
      <div className={styles.container}>
        <ProfileAside />
        <section>
          <h1>Changer mot de passe</h1>
          <form onSubmit={handleSubmit(reset)} className={styles.form}>
            <label
              className={`input-container ${errors.email && errors.email.type === "pattern" ? "isWrong" : ""}${
                watch("email") === "" ? "empty" : ""
              }`}
              htmlFor="email"
            >
              <input
                type="text"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Merci d'entrer un email valide",
                  },
                })}
                id="email"
                className={watch("email") === "" ? "empty" : ""}
              />
              <span>Email</span>
            </label>
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input type="submit" value="Envoyer Email" className={styles.submit} />
          </form>
        </section>
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

export default Password;
