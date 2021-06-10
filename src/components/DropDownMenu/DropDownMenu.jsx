import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem";
import { FaUser, FaShare, FaUserEdit } from "react-icons/fa";
import "./DropDownMenu.css";

const DropDownMenu = () => {
  return (
    <div className="dropdown">
      <DropDownMenuItem
        icon={<FaUser id="nav-icon-drop" />}
        text={"View Profile"}
      />
      <DropDownMenuItem
        icon={<FaUserEdit id="nav-icon-drop" />}
        text={"Edit Profile"}
      />
      <DropDownMenuItem icon={<FaShare id="nav-icon-drop" />} text={"Logout"} />
    </div>
  );
};

export default DropDownMenu;