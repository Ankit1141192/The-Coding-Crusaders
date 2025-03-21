// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Profile() {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     dob: "",
//     role: "Tenant",
//     avatar: "https://via.placeholder.com/150",
//   });

//   const userId = currentUser?.uid;
//   const firebaseURL = `https://your-firebase-db.firebaseio.com/users/${userId}.json`;

//   useEffect(() => {
//     if (!currentUser) navigate("/login");

//     if (userId) {
//       axios.get(firebaseURL).then(({ data }) => {
//         if (data) setForm(data);
//       });
//     }
//   }, [userId, navigate]);

//   const handleUpdateProfile = async () => {
//     await axios.put(firebaseURL, form);
//     setProfile(form);
//     setIsEditing(false);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="profile-container">
//       <h2>{isEditing ? "Edit Profile" : "Your Profile"}</h2>

//       <img src={form.avatar} alt="Avatar" className="avatar" />
//       {isEditing && <input type="file" onChange={(e) => setForm({ ...form, avatar: URL.createObjectURL(e.target.files[0]) })} />}

//       <input type="text" name="name" value={form.name} onChange={handleChange} disabled={!isEditing} />
//       <input type="date" name="dob" value={form.dob} onChange={handleChange} disabled={!isEditing} />
//       <select name="role" value={form.role} onChange={handleChange} disabled={!isEditing}>
//         <option value="Tenant">Tenant</option>
//         <option value="Landlord">Landlord</option>
//       </select>

//       {isEditing ? <button onClick={handleUpdateProfile}>Save</button> : <button onClick={() => setIsEditing(true)}>Edit Profile</button>}

//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }
