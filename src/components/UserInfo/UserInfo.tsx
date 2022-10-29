import { UserDataType } from "../../types/ListingTypes";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({
  displayName,
  image,
  createdAt,
  lastLogin,
}: UserDataType) => {
  return (
    <div className={styles.userInfo}>
      <ul className={styles.uneditableData}>
        <li>
          <div>Created at:</div>
          <div>{createdAt.toDateString()}</div>
        </li>
        <li>
          <div>Last login:</div>
          <div>{lastLogin.toDateString()}</div>
        </li>
      </ul>
      <ul className={styles.editableData}>
        <li>
          {displayName ? (
            <>
              z<div>Display name:</div>
              <div>{displayName}</div>
            </>
          ) : (
            <div>No display name</div>
          )}
        </li>
        <li>
          <div>Image url</div>
          <div>{image}</div>
        </li>
      </ul>
    </div>
  );
};
