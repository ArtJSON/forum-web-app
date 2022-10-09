import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useScrollPosition } from "../../../hooks/useScrollPosition";
import LogoIcon from "../../../../public/svg/icon.svg";
import MenuIcon from "../../../../public/svg/menu.svg";
import styles from "./Navbar.module.scss";

import { useSession, signIn } from "next-auth/react";

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
          <Image
            width={40}
            height={40}
            src={session.user?.image ?? ""}
            alt="User picture"
          />
        ) : (
          <button onClick={() => signIn()}>
            <Image src={MenuIcon} />
          </button>
        )}
      </div>
    </nav>
  );
};
