import { useEffect, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!isOpen) {
    return null;
  }

  return mounted
    ? createPortal(
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>{children}</div>
          <div className={styles.backdrop} onClick={onClose} />
        </div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById("portal")!
      )
    : null;
};
