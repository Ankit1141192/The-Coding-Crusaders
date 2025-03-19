// import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  // const {  logout } = useAuth();

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
      {/* <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
        Logout
      </button> */}
    </nav>
  );
}
