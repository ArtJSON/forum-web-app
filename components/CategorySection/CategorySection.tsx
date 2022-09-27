import Image from 'next/image';
import Link from 'next/link';

import styles from './CategorySection.module.scss';

interface CategorySectionProps {
  title?: string;
  categories: {
    imgUrl?: string;
    categoryId: string;
    categoryName: string;
    categoryDescription?: string;
    posts: number;
    lastPost: string;
  }[];
}

export const CategorySection = ({
  title = 'Categories',
  categories,
}: CategorySectionProps) => {
  return (
    <div className={styles.categorySection}>
      <div className={styles.header}>
        <div className={styles.categories}>{title}</div>
        <div className={styles.posts}>Posts</div>
        <div className={styles.lastPost}>Last Post</div>
      </div>
      {categories.map(
        ({
          imgUrl = '',
          categoryId,
          categoryName,
          categoryDescription = '',
          posts,
          lastPost,
        }) => (
          <Link key={categoryId} href={`category/${categoryId}`}>
            <div className={styles.category}>
              <div className={styles.info}>
                <div className={styles.iconContainer}>
                  <Image layout="fill" src={imgUrl} />
                </div>
                <div>
                  <p className={styles.categoryName}>{categoryName}</p>
                  <p className={styles.categoryDescription}>
                    {categoryDescription}
                  </p>
                </div>
              </div>
              <p>{posts}</p>
              <p>{lastPost}</p>
            </div>
          </Link>
        )
      )}
    </div>
  );
};
