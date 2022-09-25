import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useScrollPosition } from '../../../hooks/useScrollPosition';
import LogoIcon from '../../../public/svg/comment.svg';
import MenuIcon from '../../../public/svg/menu.svg';
import styles from './Navbar.module.scss';

export const Navbar = () => {
  const [isExtended, setIsExtended] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (isExtended) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isExtended]);

  return (
    <nav
      className={`${styles.nav} ${
        scrollPosition === 0 ? styles.transparent : ''
      }`}
    >
      <Link href="/">
        <a className={styles.logo}>
          <Image src={LogoIcon} className={styles.icon} />
          <span>Forum</span>
        </a>
      </Link>
      <div className={styles.menu}>
        <button onClick={() => setIsExtended(!isExtended)}>
          <Image src={MenuIcon} />
        </button>
      </div>
    </nav>
  );
};
