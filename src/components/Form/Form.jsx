import "./Form.css"
import { FaHandshake, FaFileUpload } from "react-icons/fa";


const Form = ({ name, description, image }) => {
  return (
    <div className="form-container">
      <div className="form-title">
        <h1>NEW <FaHandshake id="shake-pink" /> TRADE</h1>
        <p id="form-p">Please be respectful of Trade eR's strict<br />
          no currency policy... <span id="form-span">HAPPY TRADING!</span></p>
      </div>

      <section id="form-sec">
        <form>
          <div className="form-border">
            <label for="" className="form-label">{name}</label>
            <input type="text" className="form-input" />
            <label for="" className="form-label">{description}</label>
            <textarea rows="6" name="des" />
            <label for="" className="form-label">{image}</label>
            <label class="custom-file-upload">
              <input type="file" />
              <FaFileUpload id="upload" />
            </label><br />
          </div>
        </form>
      </section>

      <div className="btn-div">
        <input className="submit-btn" type="submit" value="SUBMIT"></input>
      </div>
    </div>
  )
}

export default Form;