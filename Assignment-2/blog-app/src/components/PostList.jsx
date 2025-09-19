import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available. Create one!</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">By {post.author}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
