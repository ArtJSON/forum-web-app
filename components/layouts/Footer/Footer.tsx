import Link from 'next/link';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
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

export default Footer;
