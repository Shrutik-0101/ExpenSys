import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    bio: user.bio
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        setFormData(prev => ({
        ...prev,
        profileImage: reader.result
        }));
    };
    reader.readAsDataURL(file);
};

  const saveChanges = () => {
    // Update localStorage
    // localStorage.setItem("loggedInUser", formData.name); 
    localStorage.setItem("user", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("profileImage", formData.profileImage);
    setEditMode(false);
    window.location.reload(); 
  };

  return (
    <div className="profile-card">
      {!editMode ? (
        <>
          <img
            src={formData.profileImage || "https://i.imgur.com/0y0y0y0.png"}
            alt="Profile"
            className="profile-img"
          />
          <p>{formData.email}</p>
          {formData.bio && <p className="profile-bio">{formData.bio}</p>}
          <button onClick={() => setEditMode(true)} className="profile-btn">Edit Profile</button>
        </>
      ) : (
        <div className="edit-profile-form">
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
            />
            <div className="upload-section">
                <div className="upload-left">
                    <label className="upload-label">Paste Image URL</label>
                    <input
                    type="text"
                    name="profileImage"
                    placeholder="https://example.com/image.png"
                    value={formData.profileImage.startsWith('data:image') ? '' : formData.profileImage}
                    onChange={handleChange}
                    />
            </div>
            <div className="upload-right">
                    <label className="upload-label">Upload From Device</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            </div>
            <img
                src={formData.profileImage || "https://i.imgur.com/0y0y0y0.png"}
                alt="Preview"
                className="profile-img-preview"
            />
          <textarea
            name="bio"
            placeholder="Add a short bio..."
            value={formData.bio}
            onChange={handleChange}
          />
          <div className="profile-edit-buttons">
            <button onClick={saveChanges}>💾 Save</button>
            <button onClick={() => setEditMode(false)}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

