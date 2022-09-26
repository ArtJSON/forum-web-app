import Image from 'next/image';

import styles from './CategorySection.module.scss';

interface CategoriesSectionProps {
  categories: {
    imgUrl?: string;
    categoryId: string;
    categoryName: string;
    categoryDescription?: string;
    posts: number;
    lastPost: string;
  }[];
}

export const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <div className={styles.categorySection}>
      <div className={styles.header}>
        <div className={styles.categories}>Categories</div>
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
          <div key={categoryId} className={styles.category}>
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
        )
      )}
    </div>
  );
};
