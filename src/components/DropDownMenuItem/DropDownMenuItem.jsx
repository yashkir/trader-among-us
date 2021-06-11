import "./DropDownMenuItem.css";


const DropDownMenuItem = (props) => {
  return (
    <div className="drop-contain" onClick={props.handleLogout}>
      <div className="icon-contain-drop">{props.icon}</div>
      <div className="dropdown-div">
        <h1 id="drop-h1">{props.text}</h1>
      </div>
    </div>
  );
};

export default DropDownMenuItem;
