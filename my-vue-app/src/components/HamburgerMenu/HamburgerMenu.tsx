import { useContext } from "react";
import styles from "./HamburgerMenu.module.scss";
import { BurgerMenuContext } from "../../Context/context";
import { ReactComponent as Menu } from "../../assets/burger-menu.svg";
import { ReactComponent as Close } from "../../assets/cross.svg";
import { IMenu } from "../../utility/types";

const HamburgerMenu = ({ className }: IMenu) => {
  //   const context = useContext(ActiveContext
  const { isMenuOpen, toggleMenu } = useContext(BurgerMenuContext);
  return (
    <button className={className} onClick={() => toggleMenu()}>
      {!isMenuOpen ? <Menu /> : <Close />}
    </button>
  );
};

export default HamburgerMenu;
