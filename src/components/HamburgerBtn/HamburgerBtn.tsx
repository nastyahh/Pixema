import { useContext } from "react";
import { ActiveContext } from "../../Context/context";
import styles from "./HamburgerMenu.module.scss";
import { ReactComponent as Menu } from "../../assets/burgerMenu.svg";
import { ReactComponent as MenuClose } from "../../assets/burgerClose.svg";

const HamburgerBtn = () => {
  const context = useContext(ActiveContext);

  return (
    <button
      className={styles.hamburger_menu}
      onClick={() => context?.setIsActive(!context.isActive)}
    >
      {!context?.isActive ? <Menu /> : <MenuClose />}
    </button>
  );
};

export default HamburgerBtn;
