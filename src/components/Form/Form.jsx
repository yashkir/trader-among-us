import "./Form.css"
import { FaFileUpload } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle"


const Form = ({ name, description, image }) => {
  return (
    <div className="form-container">

      <PageTitle titleOne={"NEW"} titleTwo={"TRADE"} />

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