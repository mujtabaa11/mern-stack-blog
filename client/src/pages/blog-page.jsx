import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BlogPage() {
  const { id } = useParams();
  const { blogsList, isPending } = useSelector((state) => state.blog);

  // Find the blog post by ID
  const post = blogsList.find((blog) => blog._id === id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          Blog post not found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>

      {/* Blog Metadata */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>
          <span className="font-semibold">Author:</span> {post.author || "Unknown"}
        </p>
        <p>
          <span className="font-semibold">Category:</span>{" "}
          {post.category || "Uncategorized"}
        </p>
        <p>
          <span className="font-semibold">Published:</span>{" "}
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Date not available"}
        </p>
      </div>

      {/* Blog Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded-lg shadow-md"
        />
      ) }

      {/* Blog Content */}
      <div className="prose max-w-none">
        <p>{post.body || "No content available."}</p>
      </div>

      {/* Blog Tags */}
      {post.tags && (
        <div className="text-sm text-gray-600 mt-4">
          <span className="font-semibold">Tags:</span> {post.tags}
        </div>
      )}
    </div>
  );
}
