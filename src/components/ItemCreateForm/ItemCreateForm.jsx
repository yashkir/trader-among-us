import { useState } from "react";
import { getToken } from "../../utils/users-service";
import PageTitle from "../PageTitle/PageTitle";
import { FaFileUpload } from 'react-icons/fa'

export default function ItemCreateForm() {
  const [file, setFile] = useState({ preview: "", raw: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", "myitem");
    formData.append("image", file.raw);
    formData.append("description",)

    // TODO move this out to a service or api file
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getToken(),
      },
      body: formData
    });

    if (res.ok) {
      setMessage("done");
    } else {
      setMessage(res.message || "Could not upload");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files.length) {
      setFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  return (
    <div className="ImageUpload">
      <p>{message}</p>
      <form
        action="/api/items"
        method="post"
        onSubmit={handleSubmit}
      >
        <section id="form-sec">
          <div className="form-border">
            <label className="form-label" htmlFor="title">Item Name</label>
            <input className="form-input" type="text" name="title" id="title" />
            <br />
            <label for="description" className="form-label">Description</label>
            <textarea
              id="text"
              rows="6"
              name="text"
              value=''
              onChange={handleSubmit}
            />
            <label for="image" className="form-label">Image</label>
            <label htmlFor="image" >
              {file.preview ? (
                <img alt="preview" src={file.preview} width="300" height="300" />
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
          <button className="submit-btn" type="submit">ADD ITEM</button>
        </div>
      </form>
    </div>
  );
}
