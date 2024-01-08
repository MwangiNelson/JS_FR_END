import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Auth from "../pages/Auth";

function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default Navigation;
