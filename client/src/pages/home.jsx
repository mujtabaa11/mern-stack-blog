import { useEffect } from "react";
import BlogCard from "../components/blog-card";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setBlogsList,
  setIsPending,
  clearFormData,
} from "../store/blog-slice/blog-slice";

export default function Home() {
  const dispatch = useDispatch();
  const { blogsList, isPending } = useSelector((state) => state.blog);

  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(clearFormData());
    navigate("/edit-blog");
  };

  const fetchBlogs = async () => {
    try {
      dispatch(setIsPending(true));
      const response = await fetch("http://localhost:3001/api/blogs");
      const data = await response.json();
      dispatch(setBlogsList(data));
      dispatch(setIsPending(false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          Latest Blogs
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Explore the latest posts from our community.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="container mx-auto p-4">
        {blogsList && blogsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsList.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg"
              >
                {/* Content container */}
                <div className="p-1">
                  <BlogCard post={post} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-6">
            No blogs available. Add a blog to get started!
          </p>
        )}
      </div>

      {/* Create Blog Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleClick}
          className="text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        >
          Create a New Blog
        </button>
      </div>
    </div>
  );
}
