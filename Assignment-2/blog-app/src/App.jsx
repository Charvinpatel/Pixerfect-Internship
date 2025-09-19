import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostView from "./components/PostView";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Blog App
          </Link>
          <Link
            to="/create"
            className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
          >
            Create New Post
          </Link>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/edit/:id" element={<PostForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
