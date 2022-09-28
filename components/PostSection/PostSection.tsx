import Image from 'next/image';
import Link from 'next/link';

import { PostListingType } from '../../types/ListingTypes';
import { constants } from '../../utils/constants';
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
          userImgUrl = constants.svg.NO_IMG_URL,
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
                    <div className={styles.lastResponse}>
                      <Image
                        width={20}
                        height={20}
                        src={constants.svg.CALENDAR_URL}
                      />
                      <span>{lastResponse}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.social}>
                  <p className={styles.likes}>
                    <Image
                      width={20}
                      height={20}
                      src={constants.svg.HEART_URL}
                    />
                    <span>{likes}</span>
                  </p>
                  <p className={styles.responses}>
                    <Image
                      width={20}
                      height={20}
                      src={constants.svg.COMMENT_URL}
                    />
                    <span>{responses}</span>
                  </p>
                  <p className={styles.views}>
                    <Image width={20} height={20} src={constants.svg.EYE_URL} />
                    <span>{views}</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};
