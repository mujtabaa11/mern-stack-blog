import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFormData, setIsEdit, deleteBlog } from "../store/blog-slice/blog-slice";

export default function BlogCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setFormData(post));
    dispatch(setIsEdit(true));
    navigate("/edit-blog"); // Navigate to the edit page with the blog ID
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/blogs/${post._id}`
        );

        if (response.status === 200) {
          alert("Blog deleted successfully.");
          dispatch(deleteBlog(post._id));
          navigate(0); // Refresh the page
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete the blog. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px",
      }}
    >
      {/* Blog title */}
      <p>{post.title}</p>

      {/* Blog image */}
      <div>
        {post.image && (
          <img
            src={post.image} // Default image if post.image is not provided
            alt={post.title}
            width={500} // Example width, adjust based on design
            height={300} // Example height, adjust based on design
          />
        )}
      </div>

      {/* Blog details */}
      <div>
        <p>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Date not available"}
        </p>
        <p>{post.author}</p>
        <p>{post.category}</p>
      </div>

      {/* Blog content snippet */}
      <p>{post.body.substring(0, 100)}...</p>

      {/* Edit and Delete icons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <FaEdit
          onClick={() => handleEdit(post)}
          size={20}
          style={{ cursor: "pointer" }}
        />
        <FaTrash
          onClick={handleDelete}
          size={20}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
