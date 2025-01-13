import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import BlogEditor from "./pages/blog-editor";
import Footer from "./components/footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content with padding to prevent overlap */}
      <div className="flex-grow pt-16">
        {" "}
        {/* Adjust padding according to header height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-blog" element={<BlogEditor />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
