import Link from 'next/link';

import styles from './Location.module.scss';

interface LocationProps {
  paths?: {
    label: string;
    url: string;
  }[];
}

export const Location = ({ paths }: LocationProps) => {
  if (paths == null) {
    return (
      <div className={styles.locationsContainer}>
        <span className={styles.location}>
          <span>Forum</span>
        </span>
      </div>
    );
  }

  return (
    <div className={styles.locationsContainer}>
      <Link href="/">
        <a className={styles.location}>
          <span>Forum</span>
        </a>
      </Link>
      {paths?.map(({ label, url }, idx) =>
        idx !== paths.length - 1 ? (
          <Link href={url} key={label + url}>
            <a className={styles.location}>
              <span>{label}</span>
            </a>
          </Link>
        ) : (
          <span key={label + url} className={styles.location}>
            <span>{label}</span>
          </span>
        )
      )}
    </div>
  );
};
