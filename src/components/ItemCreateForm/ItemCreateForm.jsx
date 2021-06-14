import { useState } from "react";
import { getToken } from "../../utils/users-service";

export default function ItemCreateForm() {
  const [file, setFile] = useState({ preview: "", raw: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", "myitem");
    formData.append("image", file.raw);

    // TODO move this out to a service or api file
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getToken(),
      },
      body: formData
    });

    if(res.ok) {
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
      <h1>Add a new item</h1>
      <p>{message}</p>
      <form
        action="/api/items"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Item Name</label>
        <input type="text" name="title" id="title"/>
        <br />
        <label htmlFor="image">
          {file.preview ? (
            <img alt="preview" src={file.preview} width="300" height="300" />
          ) : (
            <span style={{border: "2px solid black"}}>Choose Image</span>
          )}
        </label>
        <input
          style={{display: "none"}}
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
