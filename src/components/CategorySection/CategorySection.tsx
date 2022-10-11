import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { constants } from "../../utils/constants";
import styles from "./CategorySection.module.scss";

import { AppRouter } from "../../server/trpc/router";
import { inferProcedureOutput } from "@trpc/server";

type t = inferProcedureOutput<AppRouter["category"]["getAll"]>;

interface CategorySectionProps {
  title?: string;
  categories: t;
}

export const CategorySection = ({
  title = "Categories",
  categories,
}: CategorySectionProps) => {
  return (
    <div className={styles.categorySection}>
      <div className={styles.header}>
        <p className={styles.categoriesHeader}>{title}</p>
        <p className={styles.postsHeader}>Posts</p>
        <p className={styles.lastPostHeader}>Last Post</p>
      </div>
      {categories.map(({ image, id, name, description = "", posts }) => (
        <Link key={id} href={`category/${id}`}>
          <div className={styles.category}>
            <div className={styles.info}>
              <div className={styles.iconContainer}>
                <Image
                  layout="fill"
                  src={image ?? constants.svg.NO_IMG_URL}
                  alt="Category logo"
                />
              </div>
              <div>
                <p className={styles.categoryName}>{name}</p>
                <p className={styles.categoryDescription}>{description}</p>
              </div>
            </div>
            <p className={styles.posts}>{posts}</p>
            <p className={styles.lastPost}>{1}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
