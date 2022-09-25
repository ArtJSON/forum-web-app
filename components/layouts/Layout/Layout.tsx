import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.scss';

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>{children}</div>
      <Footer />
    </>
  );
};
