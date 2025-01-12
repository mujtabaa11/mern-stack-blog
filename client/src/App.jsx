import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import BlogEditor from "./pages/blog-editor";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-blog" element={<BlogEditor />} />
      </Routes>
    </div>
  );
}

export default App;
