import { useContext } from "react";
import { BurgerMenuContext } from "../../Context/context";
import { ReactComponent as Menu } from "../../assets/burger-menu.svg";
import { ReactComponent as Close } from "../../assets/cross.svg";
import { IMenu } from "../../utility/types";

const HamburgerMenu = ({ className }: IMenu) => {
  const { isMenuOpen, toggleMenu } = useContext(BurgerMenuContext);
  return (
    <button className={className} onClick={() => toggleMenu()}>
      {!isMenuOpen ? <Menu /> : <Close />}
    </button>
  );
};

export default HamburgerMenu;
