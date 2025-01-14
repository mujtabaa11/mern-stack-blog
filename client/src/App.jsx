import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import BlogEditor from "./pages/blog-editor";
import Footer from "./components/footer";
import BlogPage from "./pages/blog-page";

function App() {
  return (
    <div>
    <Header />
    <div className="flex flex-col min-h-screen">
      {/* Header */}
     

      {/* Main content with padding to prevent overlap */}
      <div className="bodyClass flex-grow pt-16">
        {" "}
        {/* Adjust padding according to header height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-blog" element={<BlogEditor />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </div>

      {/* Footer */}
      
    </div>
    <Footer />
    </div>
  );
}

export default App;
