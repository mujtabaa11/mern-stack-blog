import { useEffect } from "react";
import BlogCard from "../components/blog-card";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, setBlogsList, setIsPending } from "../store/blog-slice/blog-slice";

export default function Home() {
  const dispatch = useDispatch();
  const { blogsList, isPending } = useSelector((state) => state.blog);

  const navigate = useNavigate();

  const handleClick = () => {
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
    <div>
      <h1>Latest Blogs</h1>
      <div className="blogs-container">
        {blogsList && blogsList.length > 0 ? (
          blogsList.map((post) => (
            <div key={post._id}>
              <BlogCard post={post} onDelete={(id) => deleteBlog(id)} />
            </div>
          ))
        ) : (
          <p>No blogs available. Add a blog now.</p>
        )}
      </div>

      <button onClick={handleClick}>
        Create a new blog
      </button>
    </div>
  );
}
