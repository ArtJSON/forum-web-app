import styles from './SearchBanner.module.scss';

export const SearchBanner = () => (
  <section className={styles.searchBanner}>
    <input
      className={styles.input}
      id="search"
      name="search"
      type="text"
      placeholder="Search for topics..."
    />
  </section>
);
