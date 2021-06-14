import { useState } from 'react';
import "./Form.css"
import { FaFileUpload } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle"
import postsApi from "../../utils/posts-api";


const Form = ({ name, description, image }) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    text: "",
    image: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setInputValues({...inputValues, [e.target.name]: e.target.value});
  };

  /* FIXME we are not doing any client-side verification here, just calling the API*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postsApi.create({
        title: inputValues.title,
        text: inputValues.text,
      });
      setStatus(response);
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div className="Form form-container">

      <PageTitle titleOne={"NEW"} titleTwo={"POST"} />

      {/* TODO style this error message */}
      {status ? <p>{status}</p> : null}

      <section id="form-sec">
        <form onSubmit={handleSubmit}>
          <div className="form-border">
            <label for="title" className="form-label">Title</label>
            <input id="title"
              name="title"
              type="text"
              className="form-input"
              value={inputValues.title}
              onChange={handleChange}
            />
            <label for="description" className="form-label">Description</label>
            <textarea
              id="text"
              rows="6"
              name="text"
              value={inputValues.text}
              onChange={handleChange}
            />
            <label for="image" className="form-label">Image</label>
            <label id="image" class="custom-file-upload">
              <input
                type="file"
                name="image"
                value={inputValues.image}
                onChange={handleChange}
              />
              <FaFileUpload id="upload" />
            </label><br />
          </div>
        </form>
      </section>

      <div className="btn-div">
        <input className="submit-btn" type="submit" value="SUBMIT" onClick={handleSubmit}></input>
      </div>
    </div>
  )
}

export default Form;
