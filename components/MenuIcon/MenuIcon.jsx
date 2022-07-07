import { useState } from "react";

const MenuIcon = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`burgerContainer mobile ${toggle ? "active" : ""}`} onClick={() => setToggle(!toggle)}>
      <div className="burger">
        <div className="ligne1"></div>
        <div className="ligne2"></div>
        <div className="ligne3"></div>
      </div>
    </div>
  );
};

export default MenuIcon;
