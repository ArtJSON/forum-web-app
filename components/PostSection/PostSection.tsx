import Image from 'next/image';
import Link from 'next/link';

import { PostListingType } from '../../types/ListingTypes';
import { CONSTANTS } from '../../utils/constants';
import { Tag } from '../Tag/Tag';
import styles from './PostSection.module.scss';

interface PostSectionProps {
  title?: string;
  posts: PostListingType[];
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
                <div className={styles.details}>
                  <p className={styles.postTitle}>{title}</p>
                  <div className={styles.otherInfo}>
                    <div className={styles.tags}>
                      {tags?.map((tag) => (
                        <Tag key={tag} tag={tag} />
                      ))}
                    </div>
                    <p className={styles.lastResponse}>{lastResponse}</p>
                  </div>
                </div>
                <div className={styles.social}>
                  <p className={styles.likes}>{likes}</p>
                  <p className={styles.responses}>{responses}</p>
                  <p className={styles.views}>{views}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};
