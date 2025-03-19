import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../pages/index.css";

export default function Profile() {
  const { currentUser, profile, updateProfileData, uploadAvatar, logout } = useAuth();
  const [name, setName] = useState(profile?.name || currentUser?.displayName || "");
  const [dob, setDob] = useState(profile?.dob || "");
  const [role, setRole] = useState(profile?.role || "Tenant");
  const [avatar, setAvatar] = useState(profile?.avatar || "https://via.placeholder.com/150");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Handle Profile Update
  const handleUpdateProfile = async () => {
    await updateProfileData(currentUser.uid, { name, dob, role });
    setIsEditing(false);
  };

  // ✅ Handle Avatar Upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadAvatar(file);
      setAvatar(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>

        {/* ✅ Avatar Upload */}
        <div className="avatar-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <input type="file" onChange={handleAvatarChange} accept="image/*" />
        </div>

        {/* ✅ Profile Form */}
        <div className="profile-info">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            disabled={!isEditing}
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} disabled={!isEditing}>
            <option value="Tenant">Tenant</option>
            <option value="Landlord">Landlord</option>
          </select>

          <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing && (
            <button onClick={handleUpdateProfile} className="save-button">
              Save Changes
            </button>
          )}
        </div>

        {/* ✅ Logout Button */}
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}
