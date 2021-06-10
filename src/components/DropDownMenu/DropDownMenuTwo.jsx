import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem";
import { FaPlusCircle, FaListUl } from "react-icons/fa";
import "./DropDownMenu.css";

const DropDownMenuTwo = () => {
  return (
    <div className="dropdown">
      <DropDownMenuItem
        icon={<FaPlusCircle id="nav-icon-drop" />}
        text={"New Trade"}
      />
      <DropDownMenuItem
        icon={<FaListUl id="nav-icon-drop" />}
        text={"View Trades"}
      />
    </div>
  );
};

export default DropDownMenuTwo;