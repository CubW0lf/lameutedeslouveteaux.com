import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useUxContext } from "../contexts/uxContext";
import Title from "../components/Title/Title";
import Flash from "../components/Flash/Flash";
import styles from "../styles/Connexion.module.css";
import { login } from "../directus/utils";

const Register = () => {
  const router = useRouter();

  const { flash, flashType, handleFlash, setIsAuthenticated, isAuthenticated, redirect, setRedirect } = useUxContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (redirect !== "") {
        router.push(redirect);
        setRedirect("");
      } else {
        router.push("/profil");
      }
    }
  }, [router, isAuthenticated, setRedirect, redirect]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = async (credentials) => {
    await login(credentials)
      .then(() => {
        setIsAuthenticated(true);
        handleFlash("success", "Connexion...", 1000);
      })
      .catch((err) => handleFlash("error", err.message, 3000));
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
        <meta name="description" content="Connexion à l'espace membre, pour accéder aux projets" />
      </Head>
      <div className={styles.login}>
        <Title text="Connexion" />
        <div className={styles.container}>
          <form onSubmit={handleSubmit(submit)} className={styles.form}>
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

            <label
              htmlFor="password"
              className={`input-container ${errors.password && errors.password.type === "pattern" ? "isWrong" : ""}${
                watch("password") === "" ? "empty" : ""
              }`}
            >
              <input
                type="password"
                {...register("password", {
                  required: "Le mot de passe est requis",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message:
                      "Merci d'entrer un mot de passe comprenant au moins 8 caractères, un caractère spécial, et un chiffre",
                  },
                })}
                id="password"
                className={watch("password") === "" ? "empty" : ""}
              />
              <span>Mot de Passe</span>
            </label>
            <input type="submit" value="Connexion" className={styles.submit} />
            <Link href="/oubli">
              <a className={styles.forgot}>Mot de Passe Oublié</a>
            </Link>
          </form>
          {flash && <Flash type={flashType} text={flash} />}
        </div>
      </div>
    </>
  );
};

export default Register;
