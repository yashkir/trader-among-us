import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem";
import { FaUser, FaShare, FaUserEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import * as userService from "../../utils/users-service";
import { getUser } from "../../utils/users-service"

import "./DropDownMenu.css";

const DropDownMenu = ({ setUser }) => {
  const user = getUser()
  const history = useHistory()

  const handleLogout = () => {
    userService.logOut();
    setUser(null);
    history.push('/login')
  }

  const handleUserProfile = () => {
    history.push(`/users/${user._id}/items`)
  }


  return (
    <div className="dropdown">

      <DropDownMenuItem
        icon={<FaUser id="nav-icon-drop" />}
        text={"View Profile"}
        handleLogout={handleUserProfile}
      />

      <DropDownMenuItem
        icon={<FaUserEdit id="nav-icon-drop" />}
        text={"Edit Profile"}
      />

      <DropDownMenuItem
        icon={<FaShare id="nav-icon-drop" />}
        text={"Logout"}
        handleLogout={handleLogout} />
    </div>
  );
};

export default DropDownMenu;
