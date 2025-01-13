import { useEffect } from "react";
import BlogCard from "../components/blog-card";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBlogsList, setIsPending, clearFormData } from "../store/blog-slice/blog-slice";

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
      return blogsList;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container flex flex-col min-h-screen">
    {/* Page Title */}
    <h1 className="text-2xl font-bold text-text-primary mb-4">Latest Blogs</h1>
  
    {/* Blogs Container */}
    <div className="blogs-container flex-grow flex flex-wrap gap-4 pt-10 pb-6">
      {blogsList && blogsList.length > 0 ? (
        blogsList.map((post) => (
          <div key={post._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <BlogCard post={post} />
          </div>
        ))
      ) : (
        <p className="text-text-secondary">No blogs available. Add a blog now.</p>
      )}
    </div>
  
    {/* Button at the Bottom */}
    <div className="mt-auto self-center">
      <button
        onClick={handleClick}
        className="bg-primary text-white py-2 px-4 mb-2 rounded hover:bg-[#3673a4] transition-colors"
      >
        Create a new blog
      </button>
    </div>
  </div>
  
  );
}
