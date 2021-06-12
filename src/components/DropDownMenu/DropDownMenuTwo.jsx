import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem";
import { FaPlusCircle, FaListUl } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./DropDownMenu.css";

const DropDownMenuTwo = () => {
  const history = useHistory()

  const handleHistory = () => {
    history.push('/posts/new')
  }
  return (
    <div className="dropdown">
      <DropDownMenuItem
        icon={<FaPlusCircle id="nav-icon-drop" />}
        text={"New Post"}
        handleLogout={handleHistory}
      />
      <DropDownMenuItem
        icon={<FaListUl id="nav-icon-drop" />}
        text={"View Posts"}
      />
    </div>
  );
};

export default DropDownMenuTwo;