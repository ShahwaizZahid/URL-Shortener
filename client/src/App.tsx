import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Login from "./Login";
import SignupForm from "./SignupForm";
import { useAuth } from "./context/AuthProvider";
export default function App() {
  const { user } = useAuth()!;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
      </Routes>
    </>
  );
}
