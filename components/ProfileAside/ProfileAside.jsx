import styles from "./ProfileAside.module.css";
import { FaUserCircle, FaLock, FaFolderOpen, FaHome, FaFolderPlus } from "react-icons/fa";
import Link from "next/link";

const ProfileAside = () => {
  return (
    <aside className={styles.container}>
      <Link href="/profil">
        <a>
          <FaHome />
          <span>Infos</span>
        </a>
      </Link>
      <Link href="/profil/avatar">
        <a>
          <FaUserCircle />
          <span>Avatar</span>
        </a>
      </Link>
      <Link href="/profil/mot-de-passe">
        <a>
          <FaLock />
          <span>Mot de Passe</span>
        </a>
      </Link>
      <Link href="/profil/mes-projets">
        <a>
          <FaFolderOpen />
          <span>Projets</span>
        </a>
      </Link>
      <Link href="/profil/nouveau-projet">
        <a>
          <FaFolderPlus />
          <span>Nouveau Projet</span>
        </a>
      </Link>
    </aside>
  );
};

export default ProfileAside;
