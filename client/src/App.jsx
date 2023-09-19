import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/registerPage/Register";
import Home from "./pages/homepage/Home";
import Profile from "./pages/profilePage/Profile";
import Login from "./pages/loginPage/Login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
