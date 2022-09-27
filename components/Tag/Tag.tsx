import Link from 'next/link';

import styles from './Tag.module.scss';

interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => (
  <Link href={`/tag/${tag}`}>
    <div className={styles.tag}>{tag}</div>
  </Link>
);
