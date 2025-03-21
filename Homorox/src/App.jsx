import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AuthProvider } from "./context/AuthContext";
import Main1 from "./components/Main1";
import Footer from "./components/Footer";
import Home from "./pages/Home";



function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/home" || location.pathname === "/home/tenant";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <Main1 />}
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>} />
         
        </Routes>
      </AuthProvider>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
