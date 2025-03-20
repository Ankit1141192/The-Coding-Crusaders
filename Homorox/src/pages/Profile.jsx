import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ Use for navigation
import axios from "axios";
import "../pages/index.css";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Navigation hook
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("Tenant");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?.uid;
  const firebaseURL = `https://the-coding-crusaders-default-rtdb.firebaseio.com/users/${userId}.json`;

 
  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); 
    }
  }, [currentUser, navigate]);

  
  useEffect(() => {
    let isMounted = true; 

    if (userId) {
      axios.get(firebaseURL)
        .then((response) => {
          if (isMounted && response.data) {
            setProfile(response.data);
            setName(response.data.name || "");
            setDob(response.data.dob || "");
            setRole(response.data.role || "Tenant");
            setAvatar(response.data.avatar || "https://via.placeholder.com/150");
          }
        })
        .catch((error) => console.error("Error fetching profile:", error))
        .finally(() => setLoading(false));
    }

    return () => { isMounted = false }; // Cleanup function
  }, [userId]);

  const handleUpdateProfile = async () => {
    const updatedProfile = { name, dob, role, avatar };

    try {
      await axios.put(firebaseURL, updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);

      try {
        await axios.patch(firebaseURL, { avatar: imageUrl });
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-edit-card">
        <h2>{isEditing ? "Edit Profile" : "Your Profile"}</h2>

        <div className="avatar-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
          {isEditing && <input type="file" onChange={handleAvatarChange} accept="image/*" />}
        </div>

        {isEditing ? (
          <div className="profile-info">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Tenant">Tenant</option>
              <option value="Landlord">Landlord</option>
            </select>

            <button onClick={handleUpdateProfile} className="save-button">Save Changes</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
        )}

        <button onClick={logout} className="logout-button">Logout</button>
      </div>
      
      {!isEditing && profile && (
        <div className="profile-view-card">
          <h2>Profile Details</h2>
          <img src={profile.avatar} alt="Profile" className="profile-view-avatar" />
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>DOB:</strong> {profile.dob}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}
    </div>
  );
}
