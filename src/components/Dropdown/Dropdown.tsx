import styles from "./Dropdown.module.scss";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";

interface DropdownProps {
  options?: ReactElement[];
  toggle: ReactElement;
}

export const Dropdown = ({ options = [], toggle }: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdwonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        event.target instanceof Element &&
        dropdwonRef.current &&
        !dropdwonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchmove", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchmove", handleClickOutside);
    };
  }, [dropdwonRef]);

  return (
    <div ref={dropdwonRef} className={styles.dropdown}>
      <div onClick={() => setDropdownOpen((prev) => !prev)}>{toggle}</div>

      <ul
        className={`${styles.dropdownOptions} ${
          dropdownOpen ? null : styles.closed
        }`}
      >
        {options.map((option) => (
          <li onClick={() => setDropdownOpen(false)} key={option.key}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
