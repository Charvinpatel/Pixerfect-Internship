import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", author: "", content: "" });

  useEffect(() => {
    if (id) {
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      const currentPost = posts.find((p) => p.id === id);
      if (currentPost) setPost(currentPost);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    if (id) {
      // Update existing post
      const updatedPosts = posts.map((p) =>
        p.id === id ? { ...post, id } : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } else {
      // Create new post
      const newPost = { ...post, id: Date.now().toString() };
      localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
    }
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Post" : "Create Post"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
