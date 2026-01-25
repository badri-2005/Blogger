import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BlogDetails from "./Pages/BlogDetails";
import EditBlog from "./Pages/EditBlog";
import AddBlog from "./Pages/AddBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/add" element={<AddBlog />} />
  <Route path="/blog/:id" element={<BlogDetails />} />
  <Route path="/edit/:id" element={<EditBlog />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
