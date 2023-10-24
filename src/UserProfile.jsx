import React, { useState, useRef } from 'react';
import NavBar from './components/NavBar';
import './UserProfile.css'; // Replace 'your-css-file.css' with the actual CSS file name

function UserProfile() {
  // Sample user data (replace with actual data from your backend)
  const userData = {
    name: 'Fabio Pecora',
    specialty: 'Italian Food',
    followers: 1000,
    following: 500,
    favoriteRecipes: ['Recipe A', 'Recipe B', 'Recipe C'],
  };

  // State to store the uploaded image source
  const [imageSrc, setImageSrc] = useState(null);

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  // Function to open the file dialog
  function handleOpenFileDialog() {
    fileInputRef.current.click();
  }

  // Function to handle image upload
  function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const uploadedImageSrc = e.target.result;
        setImageSrc(uploadedImageSrc);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="user-profile-container">
        <div className="user-main-card card">
          <img
            src="/images/FabioPicture.PNG"
            alt="User"
            style={{ width: '100%' }}
          />
          <h1 className="user-name">Fabio Pecora</h1>
          <p className="user-info">
            Followers: {userData.followers} | Following: {userData.following}
          </p>
          <button className="see-recipes-button">See Recipes</button>
        </div>

        <div className="user-picture-section card">
          <h1 className="my-dishes-title">#MyDishes</h1>
          <div className="picture-grid">
            <img src="/images/Lasagna.PNG" alt="Lasagna" className="grid-image" />
            <img src="/images/Cotoletta.jpg" alt="Cotoletta" className="grid-image" />
            <img src="/images/Pesto.jpg" alt="Pesto" className="grid-image" />
            <img src="/images/Pizza.jpg" alt="Pizza" className="grid-image" />
            <img src="/images/Pork.jpg" alt="Pork" className="grid-image" />
            <img src="/images/Pasta.jpg" alt="Pasta" className="grid-image" />
          </div>
          <button className="upload-button" onClick={handleOpenFileDialog}>
            Add Image
          </button>
          <div style={{ marginTop: '10px' }}>
            <input
              type="file"
              accept="image/*"
              id="picture-upload"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          {imageSrc && <img src={imageSrc} alt="Uploaded" className="uploaded-image" />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
