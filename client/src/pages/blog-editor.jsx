import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setErrorMessage } from "../store/error-slice/error-slice";
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
  const { errorMessage } = useSelector((state) => state.error);
  const { formData, isEdit, isPending } = useSelector((state) => state.blog);

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

    if (isPending) return; // Prevent multiple submissions

    dispatch(setIsPending(true));

    try {
      // Validate required fields
      if (!formData.title || !formData.body ) {
        setErrorMessage("Please fill in all required fields.");
        dispatch(setIsPending(false));
        return;
      }

      // Prepare the payload as a plain object
      const payload = {
        title: formData.title,
        body: formData.body,
        author: formData.author || "Anonymous",
        category: formData.category || "Other",
        tags: formData.tags || "",
        image: formData.image || "", // Send the Base64 string
      };

      let response;

      if (isEdit) {
        // Update the blog
        response = await axios.put(
          `http://localhost:3001/api/blogs/${formData._id}`,
          payload
        );
        dispatch(editBlog({ id: formData._id, updatedBlog: response.data }));


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
      dispatch(setErrorMessage("An error occurred. Please try again."));
    } finally {
      dispatch(setIsPending(false));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">
        {isEdit ? "Edit Blog" : "Create A New Blog"}
      </h2>
  
      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
      )}
  
      {/* Form Section */}
      <section>
        <form
          onSubmit={handleBlogFormSubmission}
          className="space-y-4"
        >
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => dispatch(setFormData({ title: e.target.value }))}
              placeholder="Enter blog title"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
  
          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block text-gray-700 font-medium">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => dispatch(setFormData({ author: e.target.value }))}
              placeholder="Author"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
  
          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                dispatch(setFormData({ category: e.target.value }))
              }
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">Select a category</option>
              <option value="Politics">Politics</option>
              <option value="Business">Business</option>
              <option value="Tech">Tech</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Society">Society</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          {/* Content Field */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium">
              Content
            </label>
            <textarea
              id="content"
              value={formData.body}
              onChange={(e) => dispatch(setFormData({ body: e.target.value }))}
              placeholder="Write your blog here..."
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 h-80"
              required
            ></textarea>
          </div>
  
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full text-white py-2 px-4 mb-2 rounded hover:bg-[#3673a4] transition-colors ${
                isPending && "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
  
}
