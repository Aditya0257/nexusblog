import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/" element={<Signin />} /> */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/no/:no" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />{" "}
          </Routes>
        </BrowserRouter>
      </RecoilRoot>{" "}
    </>
  );
}

export default App;
