import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Location.module.scss';

interface LocationProps {
  paths: {
    label: string;
    url: string;
  }[];
}

export const Location = ({ paths }: LocationProps) => {
  return (
    <div className={styles.locationContainer}>
      <Link href="/">
        <a className={styles.location}>
          <span>Forum</span>
        </a>
      </Link>
      {paths.map(({ label, url }) => (
        <Link href={url} key={label + url}>
          <a className={styles.location}>
            <span>{label}</span>
          </a>
        </Link>
      ))}
    </div>
  );
};