import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const currentPost = posts.find((p) => p.id === id);
    if (currentPost) setPost(currentPost);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      const updatedPosts = posts.filter((p) => p.id !== id);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      navigate("/");
    }
  };

  if (!post) return <div className="text-center mt-8">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">By {post.author}</p>
      <p className="text-gray-800 mb-6">{post.content}</p>
      <div className="flex space-x-4">
        <Link
          to={`/edit/${post.id}`}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostView;
