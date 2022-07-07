import { useUxContext } from "../../contexts/uxContext";
import Image from "next/image";
import Link from "next/link";
import logoAlt from "../../public/assets/images/logo_alt.svg";
import styles from "./NavbarMobile.module.css";
import directus from "../../directus/directus";
import MenuIcon from "../MenuIcon/MenuIcon";

const NavbarMobile = () => {
  const { isAuthenticated, setIsAuthenticated } = useUxContext();

  const logout = async () => {
    await directus.auth.logout();
    setIsAuthenticated(false);
  };

  return (
    <>
      <MenuIcon />
      <nav className={`${styles.container} mobile`}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <Image src={logoAlt} layout="fill" objectFit="contain" alt="" />
            </div>
          </a>
        </Link>
        <Link href="/faq">
          <a>Préambule</a>
        </Link>
        <Link href="/association/membres">
          <a>Membres</a>
        </Link>
        <Link href="/association/projets">
          <a>Projets</a>
        </Link>
        <Link href="/association">
          <a>Infos</a>
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/profil">
              <a>Profil</a>
            </Link>
            <a onClick={logout} className={styles.logout}>
              Déconnexion
            </a>
          </>
        ) : (
          <>
            <Link href="/inscription">
              <a>Inscription</a>
            </Link>
            <Link href="/connexion">
              <a>Connexion</a>
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default NavbarMobile;
