import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="input-group">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="profile-info">
        <h3>Profile Information</h3>
        <p>
          <strong>Name:</strong> {profile.name || "Not provided"}
        </p>
        <p>
          <strong>Age:</strong> {profile.age || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
