import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { PostSectionType } from "../../types/ListingTypes";

import { constants } from "../../utils/constants";
import { Tag } from "../Tag/Tag";
import styles from "./PostSection.module.scss";

interface PostSectionProps {
  title?: string;
  posts: PostSectionType;
}

export const PostSection = ({ title = "Posts", posts }: PostSectionProps) => {
  return (
    <div className={styles.postSection}>
      <div className={styles.header}>
        <div className={styles.posts}>{title}</div>
      </div>
      {posts.map(({ id, name, tags, lastComment, views, responses }) => (
        <Link key={id} href={`/post/${id}`}>
          <div className={styles.post}>
            <div className={styles.info}>
              <div className={styles.details}>
                <p className={styles.postTitle}>{name}</p>
                <div className={styles.otherInfo}>
                  <div className={styles.tags}>
                    {tags.map((tag) => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </div>
                  <div className={styles.lastResponse}>
                    <Image
                      width={20}
                      height={20}
                      src={constants.svg.CALENDAR_URL}
                      alt="Last response"
                    />
                    <span>{lastComment.toDateString()}</span>
                  </div>
                </div>
              </div>
              <div className={styles.social}>
                <p className={styles.responses}>
                  <Image
                    width={20}
                    height={20}
                    src={constants.svg.COMMENT_URL}
                    alt="Comment"
                  />
                  <span>{responses}</span>
                </p>
                <p className={styles.views}>
                  <Image
                    width={20}
                    height={20}
                    src={constants.svg.EYE_URL}
                    alt="Views"
                  />
                  <span>{views}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
