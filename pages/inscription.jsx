import Title from "../components/Title/Title";
import { useForm } from "react-hook-form";
import styles from "../styles/Inscription.module.css";
import { MdOutlineDone, MdError } from "react-icons/md";
import { useUxContext } from "../contexts/uxContext";
import Flash from "../components/Flash/Flash";
import Head from "next/head";
import { createUser } from "../directus/utils";

const Register = () => {
  const roleId = "1e0253d2-0054-4594-af27-feed053ed807";
  const avatar = "4d853c02-9aa7-496b-a48c-67c1bcb7f593";

  const { flash, flashType, handleFlash } = useUxContext();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const signUp = async (credentials) => {
    await createUser({
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
      avatar: credentials.avatar,
    })
      .then(() => handleFlash("success", `Merci ${credentials.first_name}, votre compte à bien été crée`, 3000))

      .catch((err) => {
        if (err.message == ``) {
          handleFlash("error", `Retentez`, 3000);
        } else {
          handleFlash("error", err.message, 3000);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Inscription</title>
        <meta name="description" content="Inscrivez vous à l'espace membre pour accéder aux projets des membres" />
      </Head>
      <div className={styles.signUp}>
        <Title text="Inscription" />
        <div className={styles.container}>
          <ul className={styles.errors}>
            {errors.first_name ? (
              <li className={styles.error}>
                {errors.first_name.message} <MdError />
              </li>
            ) : (
              <li>
                Un Prénom{" "}
                {Object.keys(errors).length > 0 && (
                  <span>
                    <MdOutlineDone />
                  </span>
                )}
              </li>
            )}
            {errors.last_name ? (
              <li className={styles.error}>
                {errors.last_name.message} <MdError />
              </li>
            ) : (
              <li>
                Un Nom{" "}
                {Object.keys(errors).length > 0 && (
                  <span>
                    <MdOutlineDone />
                  </span>
                )}
              </li>
            )}
            {errors.email ? (
              <li className={styles.error}>
                {errors.email.message} <MdError />
              </li>
            ) : (
              <li>
                Un Email Valide{" "}
                {Object.keys(errors).length > 0 && (
                  <span>
                    <MdOutlineDone />
                  </span>
                )}
              </li>
            )}
            {errors.password ? (
              <li className={styles.error}>
                {errors.password.message} <MdError />
              </li>
            ) : (
              <li>
                Un Mot de Passe (Un caractère spécial, un chiffre, et une lettre)
                {Object.keys(errors).length > 0 && (
                  <span>
                    <MdOutlineDone />
                  </span>
                )}
              </li>
            )}
            {errors.verifyPassword ? (
              <li className={styles.error}>
                {errors.verifyPassword.message} <MdError />
              </li>
            ) : (
              <li>
                Mots de Passes identiques{" "}
                {Object.keys(errors).length > 0 && (
                  <span>
                    <MdOutlineDone />
                  </span>
                )}
              </li>
            )}
          </ul>
          <form onSubmit={handleSubmit(signUp)} className={styles.form}>
            <div className="input-flex-container">
              <label className={`input-container ${watch("first_name") === "" ? "empty" : ""}`} htmlFor="first_name">
                <input
                  type="text"
                  {...register("first_name", {
                    required: "Le Prénom est requis",
                  })}
                  id="first_name"
                  className={watch("first_name") === "" ? "empty" : ""}
                />
                <span>Prénom</span>
              </label>

              <label className={`input-container ${watch("last_name") === "" ? "empty" : ""}`} htmlFor="last_name">
                <input
                  type="text"
                  {...register("last_name", {
                    required: "Le Nom est requis",
                  })}
                  id="last_name"
                  className={watch("last_name") === "" ? "empty" : ""}
                />
                <span>Nom</span>
              </label>
            </div>
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

            <div className="input-flex-container">
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

              <label
                htmlFor="verifyPassword"
                className={`input-container ${errors.password && errors.password.type === "validate" ? "isWrong" : ""}${
                  watch("verifyPassword") === "" ? "empty" : ""
                }`}
              >
                <input
                  type="password"
                  {...register("verifyPassword", {
                    required: "Vous devez vérifier votre mot de passe",
                    validate: (value) => value === password.value || "Les Mots de passe doivent correspondre",
                  })}
                  id="verifyPassword"
                  className={watch("password") === "" ? "empty" : ""}
                />
                <span>Répétez</span>
              </label>
            </div>
            <input type="hidden" value={roleId} {...register("role")} />
            <input type="hidden" value={avatar} {...register("avatar")} />

            <input type="submit" value="S'inscrire" />
          </form>
          {flash && <Flash type={flashType} text={flash} />}
        </div>
      </div>
    </>
  );
};

export default Register;
