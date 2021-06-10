import { FaUser, FaHandshake, FaPen, FaHome } from "react-icons/fa";
import "./NavBar.css";

const NavBar = ({ handleMenu, handleSecondMenu }) => {
  return (
    <>
      <nav className="navbar">
        <div id="trader">
          <h1>
            TRADE{" "}
            <span id="dash">
              <FaHandshake id="shake" />
            </span>{" "}
            ER
          </h1>
        </div>
        <div className="icon-contain">
          <FaUser id="nav-icon" onClick={handleMenu} />
        </div>
        <div className="icon-contain">
          <FaPen id="nav-icon" onClick={handleSecondMenu} />
        </div>
        <div className="icon-contain">
          <FaHome id="nav-icon" />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
