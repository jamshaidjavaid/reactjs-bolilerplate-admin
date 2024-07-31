import React, { useState } from "react";

import "./Profile.scss";
import PrimaryButton from "../../components/UI/PrimaryButton";
import { ProfileImage } from "../../assets";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(ProfileImage);
  const [formData, setFormData] = useState({
    name: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "123456",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let hasErrors = false;

    // Check for empty fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key] = "This field is required.";
        hasErrors = true;
      }
    });

    //  password validation
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      hasErrors = true;
    }

    // confirmPassword validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);
    } else {
      // Form submission logic
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-image">
          <img src={profileImage} />
          <label htmlFor="image-upload" className="upload-button">
            <h6>Upload profile image</h6>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="First name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <p className="error">{formErrors.name}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {formErrors.lastName && (
                <p className="error">{formErrors.lastName}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {formErrors.password && (
                <p className="error">{formErrors.password}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {formErrors.confirmPassword && (
                <p className="error">{formErrors.confirmPassword}</p>
              )}
            </div>
            <PrimaryButton type="submit">Update</PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
