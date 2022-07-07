import Head from "next/head";
// import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Non Trouvée</title>
        <meta name="description" content="Page 404. Indique que la page demandée n'a pas été trouvée" />
      </Head>

      <div className="NotFound">
        <h1>Ouups Page Non Trouvé</h1>
        <h2>Erreur 404</h2>
      </div>
    </>
  );
};

export default NotFound;
