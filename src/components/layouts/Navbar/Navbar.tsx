import Image from "next/image";
import Link from "next/link";

import { useScrollPosition } from "../../../hooks/useScrollPosition";
import LogoIcon from "../../../../public/svg/icon.svg";
import LoginIcon from "../../../../public/svg/login.svg";
import styles from "./Navbar.module.scss";

import { useSession, signIn, signOut } from "next-auth/react";
import { Dropdown } from "../../Dropdown/Dropdown";
import { constants } from "../../../utils/constants";

export const Navbar = () => {
  const scrollPosition = useScrollPosition();

  const { data: session } = useSession();

  return (
    <nav
      className={`${styles.nav} ${
        scrollPosition === 0 ? styles.transparent : ""
      }`}
    >
      <Link href="/">
        <a className={styles.logo}>
          <Image src={LogoIcon} className={styles.icon} />
          <span>FlashForum</span>
        </a>
      </Link>
      <div className={styles.menu}>
        {session ? (
          <Dropdown
            toggle={
              <div className={styles.userImage}>
                <Image
                  width={40}
                  height={40}
                  src={session.user?.image ?? constants.svg.NO_IMG_URL} // TODO: Change to other placeholder
                  alt="User picture"
                />
              </div>
            }
            options={[
              // TODO: Add correct profile redirect
              <Link href="/profile" key="profile">
                Your profile
              </Link>,
              <button onClick={() => signOut()} key="logout">
                Logout
              </button>,
            ]}
          />
        ) : (
          <button onClick={() => signIn()}>
            <Image src={LoginIcon} alt="Login" />
          </button>
        )}
      </div>
    </nav>
  );
};
