import Title from "../components/Title/Title";
import { useForm } from "react-hook-form";
import styles from "../styles/Connexion.module.css";
import { useUxContext } from "../contexts/uxContext";
import Flash from "../components/Flash/Flash";
import Head from "next/head";
import Link from "next/link";
import { changePassword } from "../directus/utils";

const Register = () => {
  const { flash, flashType, handleFlash } = useUxContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
        <title>Mot de Passe Oublié</title>
        <meta name="description" content="Formulaire d'envoi d'Email pour récuperer son mot de passe." />
      </Head>
      <div className={styles.login}>
        <Title text="Mot de Passe Oublié" />
        <div className={styles.container}>
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
            <input type="submit" value="Envoyer Email" className={styles.submit} />
            <Link href="/oubli">
              <a className={styles.forgot}>Connexion</a>
            </Link>
          </form>
          {flash && <Flash type={flashType} text={flash} />}
        </div>
      </div>
    </>
  );
};

export default Register;
