import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "../../hooks/useScrollLock";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isOpen]);

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
