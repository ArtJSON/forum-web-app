import { PostType } from "../../types/ListingTypes";
import { Tag } from "../Tag/Tag";
import styles from "./Post.module.scss";

export const Post = ({ name, tags, createdAt, content, user }: PostType) => {
  return (
    <div className={styles.post}>
      <div className={styles.userInfo}>
        <span>{user.displayName}</span>
        <span> on </span>
        <span>{createdAt.toDateString()}:</span>
      </div>
      <div className={styles.postInfo}>
        <header>
          <h1>{name}</h1>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </header>
        <p>{content}</p>
      </div>
    </div>
  );
};
