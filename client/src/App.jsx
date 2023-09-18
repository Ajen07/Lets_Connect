import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/registerPage/Register";
import Home from "./pages/homepage/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
