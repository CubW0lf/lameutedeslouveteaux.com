import Image from "next/image";
import Link from "next/link";
import { RiArrowUpSFill } from "react-icons/ri";
import logoAlt from "../../public/assets/images/logo_alt.svg";
import styles from "./Navbar.module.css";
import directus from "../../directus/directus";
import { useUxContext } from "../../contexts/uxContext";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setToken } = useUxContext();

  const logout = async () => {
    await directus.auth.logout();
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <nav className={`${styles.navbar} not-mobile`}>
      <Link href="/">
        <a>
          <div className={styles.logo}>
            <Image src={logoAlt} layout="fill" objectFit="contain" alt="" />
          </div>
        </a>
      </Link>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <Link href="/faq">
              <a>Préambule</a>
            </Link>
          </li>
          <li>
            <span>L&apos;Association</span>
            <RiArrowUpSFill className={styles.chevron} />
            <ul>
              <li>
                <Link href="/association/membres">
                  <a>Membres</a>
                </Link>
              </li>
              <li>
                <Link href="/association/projets">
                  <a>Projets</a>
                </Link>
              </li>
              <li>
                <Link href="/association">
                  <a>Infos</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/profil">
                  <a>Profil</a>
                </Link>
              </li>
              <li onClick={logout} className={styles.logout}>
                Déconnexion
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/inscription">
                  <a>Inscription</a>
                </Link>
              </li>
              <li>
                <Link href="/connexion">
                  <a>Connexion</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
