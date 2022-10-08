import Link from 'next/link';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href={'/about-us'}>About us</Link>
        </li>
        <li>
          <Link href={'/contact'}>Contact</Link>
        </li>
      </ul>
      <p className={styles.copyright}>
        © 2022{' '}
        <Link href={'https://arturpietrzak.com/'}>
          <a className={styles.createdBy}>Artur Pietrzak</a>
        </Link>
      </p>
    </footer>
  );
};
