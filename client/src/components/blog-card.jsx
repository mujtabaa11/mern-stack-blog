import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setFormData,
  setIsEdit,
  deleteBlog,
} from "../store/blog-slice/blog-slice";

export default function BlogCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/blog/${post._id}`);
  };

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
      className="blog-card border border-border-primary rounded-lg p-4 m-4 hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      {/* Blog Title */}
      <p className="text-lg font-bold text-text-primary mb-2">{post.title}</p>      

      {/* Blog Details */}
      <div className="text-sm text-text-secondary mb-4">
        <p>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Date not available"}
        </p>
        <p>{post.author || "Unknown author"}</p>
        <p>{post.category || "Uncategorized"}</p>
      </div>

      {/* Blog Content Snippet */}
      <p className="text-sm text-text-primary mb-4">
        {post.body.substring(0, 100)}...
      </p>

      {/* Edit and Delete Icons */}
      <div className="flex gap-4 items-center">
        <FaEdit
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            handleEdit(post);
          }}
          size={20}
          className="text-text-primary cursor-pointer hover:text-red-500 transition-colors"
        />
        <FaTrash
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            handleDelete(post);
          }}
          size={20}
          className="text-text-primary cursor-pointer hover:text-red-500 transition-colors"
        />
      </div>
    </div>
  );
}
