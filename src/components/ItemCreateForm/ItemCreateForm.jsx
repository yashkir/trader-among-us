import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import itemsApi from "../../utils/items-api.js";
import { Redirect } from "react-router-dom";
import { getUser } from "../../utils/users-service";
import "./ItemCreateForm.css";

export default function ItemCreateForm() {
  let user = getUser();

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState({ preview: "", raw: "" });
  const [message, setMessage] = useState("");
  const [itemCreated, setItemCreated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputValues.title);
    formData.append("description", inputValues.description);
    formData.append("image", file.raw);
    try {
      await itemsApi.create(formData);
      setMessage("Item created");
      setItemCreated(true);
    } catch (err) {
      setMessage("Error creating Item");
    }
  }

  function handleChange(e) {
    if (e.target.files && e.target.files.length) {
      setFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      return;
    }
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  return (

    <div className="ImageUpload">
      {itemCreated ? <Redirect to={`/users/${user._id}/items`} /> : null}
      <p className="new-item-error-message">{message}</p>
      <form action="/api/items" method="post" onSubmit={handleSubmit}>
        <section id="form-sec">
          <div className="form-border">
            <label className="form-label" htmlFor="title">
              Item Name
            </label>
            <input
              className="form-input"
              type="text"
              name="title"
              id="title"
              value={inputValues.title}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="text"
              rows="6"
              name="description"
              value={inputValues.description}
              onChange={handleChange}
            />
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <label htmlFor="image">
              {file.preview ? (
                <img
                  className="Item-create-form-image"
                  alt="preview"
                  src={file.preview}

                />
              ) : (
                <FaFileUpload id="upload" class="custom-file-upload" />
              )}
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="image"
              id="image"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />

            <br />
          </div>
        </section>
        <div className="btn-div">
          <button className="submit-btn" type="submit">
            ADD ITEM
          </button>
        </div>
      </form>
    </div>
  );
}
