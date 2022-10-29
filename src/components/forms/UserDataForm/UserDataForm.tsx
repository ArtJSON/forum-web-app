import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import styles from "./UserDataForm.module.scss";

export const UserDataForm = () => {
  return (
    <Formik
      initialValues={{ displayName: "", imageUrl: "" }}
      onSubmit={() => {}}
    >
      {({ errors }) => (
        <Form className={styles.form}>
          <div className={styles.inputs}>
            <div className={styles.labelWrapper}>
              <label htmlFor="displayName">Display Name</label>
              {errors.displayName && (
                <span className={styles.errorMessage}>
                  {errors.displayName}
                </span>
              )}
            </div>
            <Field
              id="displayName"
              name="displayName"
              placeholder="Display name..."
              className={`${styles.field} ${
                errors.displayName ? styles.error : ""
              }`}
              maxLength={50}
            />

            <div className={styles.labelWrapper}>
              <label htmlFor="imageUrl">Image URL</label>
              {errors.imageUrl && (
                <span className={styles.errorMessage}>{errors.imageUrl}</span>
              )}
            </div>
            <Field
              id="imageUrl"
              name="imageUrl"
              placeholder="imageUrl..."
              className={`${styles.field} ${styles.textarea} ${
                errors.imageUrl ? styles.error : ""
              }`}
              maxLength={20000}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
