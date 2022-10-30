import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import styles from "./UserDataForm.module.scss";

interface UserDataFormProps {
  onSubmit: (values: { displayName: string; imageUrl: string }) => void;
}

export const UserDataForm = ({ onSubmit }: UserDataFormProps) => {
  return (
    <Formik
      initialValues={{ displayName: "", imageUrl: "" }}
      onSubmit={(values) => onSubmit(values)}
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
              placeholder="Image URL..."
              className={`${styles.field} ${
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
