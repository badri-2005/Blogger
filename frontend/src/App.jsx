import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BlogDetails from "./Pages/BlogDetails";
import EditBlog from "./Pages/EditBlog";
import AddBlog from "./Pages/AddBlog";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/add" element={<AddBlog />} />
  <Route path="/blog/:id" element={<BlogDetails />} />
  <Route path="/edit/:id" element={<EditBlog />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
