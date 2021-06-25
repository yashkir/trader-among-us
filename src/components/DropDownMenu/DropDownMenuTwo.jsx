import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem";
import { FaPlusCircle, FaListUl } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./DropDownMenu.css";

const DropDownMenuTwo = () => {
  const history = useHistory();

  const handleHistory = () => {
    history.push("/posts/new");
  };

  const handleNewItem = () => {
    history.push("/items/new");
  };
  return (
    <div className="dropdown">
      <DropDownMenuItem
        icon={<FaPlusCircle id="nav-icon-drop" />}
        text={"New Post"}
        handleLogout={handleHistory}
      />
      <DropDownMenuItem
        icon={<FaPlusCircle id="nav-icon-drop" />}
        text={"New Item"}
        handleLogout={handleNewItem}
      />
    </div>
  );
};

export default DropDownMenuTwo;