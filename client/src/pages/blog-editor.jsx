import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  setFormData,
  setIsEdit,
  editBlog,
  addBlog,
  setIsPending,
  clearFormData,
} from "../store/blog-slice/blog-slice";

export default function BlogEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, isEdit, isPending } = useSelector((state) => state.blog);
  const [errorMessage, setErrorMessage] = useState("");

  // Helper function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove the data URI prefix
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        dispatch(setFormData({ image: base64String }));
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        setErrorMessage("Failed to process the image. Please try another file.");
      }
    }
  };

  async function handleBlogFormSubmission(e) {
    e.preventDefault();

    if (isPending) return;

    dispatch(setIsPending(true));

    try {
      // Validate required fields
      if (!formData.title || !formData.author || !formData.category) {
        setErrorMessage("Please fill in all required fields.");
        dispatch(setIsPending(false));
        return;
      }

      // Prepare the payload as a plain object
      const payload = {
        title: formData.title,
        body: formData.body || "",
        author: formData.author,
        category: formData.category,
        tags: formData.tags || "",
        image: formData.image || "", // Send the Base64 string
      };

      console.log("Payload being sent:", payload);

      let response;

      if (isEdit) {
        // Update the blog
        response = await axios.put(
          `http://localhost:3001/api/blogs/${formData._id}`,
          payload
        );
        dispatch(editBlog({ id: response.data._id, updatedBlog: response.data }));


      } else {
        // Create a new blog
        response = await axios.post(
          "http://localhost:3001/api/blogs",
          payload
        );
        dispatch(addBlog(response.data));
      }

      // Clear the form data
      dispatch(clearFormData());
      dispatch(setIsEdit(false));
      navigate("/");
    } catch (error) {
      console.error("Error during blog submission:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      dispatch(setIsPending(false));
    }
  }

  return (
    <div>
      <h2>{isEdit ? "Edit Blog" : "Create A New Blog"}</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <section>
        <form onSubmit={handleBlogFormSubmission}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => dispatch(setFormData({ title: e.target.value }))}
            placeholder="Title"
            required
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => dispatch(setFormData({ author: e.target.value }))}
            placeholder="Author"
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              dispatch(setFormData({ category: e.target.value }))
            }
            required
          >
            <option value="">Select a category</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="tech">Tech</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="society">Society</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={formData.body}
            onChange={(e) => dispatch(setFormData({ body: e.target.value }))}
            placeholder="Time to get creative!"
          />

          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            placeholder="Upload Image"
          />

          <button type="submit" disabled={isPending}>
            {isEdit ? "Update" : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
}
