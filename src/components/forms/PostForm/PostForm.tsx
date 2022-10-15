import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import styles from "./PostForm.module.scss";

interface PostFormProps {
  onSubmit: (values: {
    title: string;
    content: string;
    tags: string[];
  }) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "The title is too short!")
      .max(50, "The title is too long!")
      .required("Required"),
    content: Yup.string()
      .min(10, "The content is too short!")
      .max(20000, "The content is too long!")
      .required("Required"),
    tag1: Yup.string()
      .max(15, "The tag is too long!")
      .matches(
        /^[a-zA-Z0-9@]+$/,
        "Tag cannot contain white spaces and special characters"
      ),
    tag2: Yup.string()
      .max(15, "The tag is too long!")
      .matches(
        /^[a-zA-Z0-9@]+$/,
        "Tag cannot contain white spaces and special characters"
      ),
    tag3: Yup.string()
      .max(15, "The tag is too long!")
      .matches(
        /^[a-zA-Z0-9@]+$/,
        "Tag cannot contain white spaces and special characters"
      ),
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag1: "", tag2: "", tag3: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        onSubmit({
          ...values,
          tags: [values.tag1, values.tag2, values.tag3].filter(
            (tag) => tag.length > 0
          ),
        });
      }}
    >
      {({ errors }) => (
        <Form className={styles.form}>
          <div className={styles.inputs}>
            <div className={styles.labelWrapper}>
              <label htmlFor="title">Title</label>
              {errors.title && (
                <span className={styles.errorMessage}>{errors.title}</span>
              )}
            </div>
            <Field
              id="title"
              name="title"
              placeholder="Title..."
              className={`${styles.field} ${errors.title ? styles.error : ""}`}
              maxLength={50}
            />

            <div className={styles.labelWrapper}>
              <label htmlFor="content">Content</label>
              {errors.content && (
                <span className={styles.errorMessage}>{errors.content}</span>
              )}
            </div>
            <Field
              id="content"
              name="content"
              placeholder="Content..."
              component="textarea"
              className={`${styles.field} ${styles.textarea} ${
                errors.content ? styles.error : ""
              }`}
              maxLength={20000}
            />

            <label htmlFor="tag1">Tags (optional)</label>
            <div className={styles.labelWrapper}>
              {errors.tag1 && (
                <span className={styles.errorMessage}>{errors.tag1}</span>
              )}
            </div>
            <Field
              id="tag1"
              name="tag1"
              placeholder="Tag..."
              className={`${styles.field} ${errors.tag1 ? styles.error : ""}`}
              maxLength={15}
            />

            <div className={styles.labelWrapper}>
              {errors.tag2 && (
                <span className={styles.errorMessage}>{errors.tag2}</span>
              )}
            </div>
            <Field
              id="tag2"
              name="tag2"
              placeholder="Tag..."
              className={`${styles.field} ${errors.tag2 ? styles.error : ""}`}
              maxLength={15}
            />

            <div className={styles.labelWrapper}>
              {errors.tag3 && (
                <span className={styles.errorMessage}>{errors.tag3}</span>
              )}
            </div>
            <Field
              id="tag3"
              name="tag3"
              placeholder="Tag..."
              className={`${styles.field} ${errors.tag3 ? styles.error : ""}`}
              maxLength={15}
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
