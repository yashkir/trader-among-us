import { FaHandshake } from "react-icons/fa";

const PageTitle = ({ titleOne, titleTwo }) => {
  return (
    <div className="form-title">
      <h1 className="page-title-header">{titleOne} <FaHandshake id="shake-pink" /> {titleTwo}</h1>
      <p id="form-p">Please be respectful of Trade eR's strict<br />
        no currency policy... <span id="form-span">HAPPY TRADING!</span></p>
    </div>
  )
}

export default PageTitle