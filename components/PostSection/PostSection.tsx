import Image from 'next/image';
import Link from 'next/link';

import { CONSTANTS } from '../../utils/constants';
import styles from './PostSection.module.scss';

interface PostSectionProps {
  title?: string;
  posts: {
    userImgUrl?: string;
    id: string;
    title: string;
    tags?: string[];
    lastResponse: string;
    likes: number;
    responses: number;
    views: number;
  }[];
}

export const PostSection = ({ title = 'Posts', posts }: PostSectionProps) => {
  return (
    <div className={styles.postSection}>
      <div className={styles.header}>
        <div className={styles.posts}>{title}</div>
      </div>
      {posts.map(
        ({
          userImgUrl = CONSTANTS.NO_IMG_URL,
          id,
          title,
          tags,
          lastResponse,
          likes,
          responses,
          views,
        }) => (
          <Link key={id} href={`post/${id}`}>
            <div className={styles.post}>
              <div className={styles.imageContainer}>
                <Image layout="fill" src={userImgUrl} />
              </div>
              <div className={styles.info}>
                <div className={styles.info}>
                  <p className={styles.postTitle}></p>
                  <div className={styles.details}>
                    <div className={styles.tags}></div>
                    <p className={styles.lastResponse}>{lastResponse}</p>
                  </div>
                </div>
                <div className={styles.social}></div>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};
