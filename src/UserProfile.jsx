import React, { useState, useRef, useEffect } from 'react';
import NavBar from './components/NavBar';
import './UserProfile.css'; // Import your CSS file
import { createClient } from '@supabase/supabase-js';
import { SketchPicker } from 'react-color';
import ColorPicker from './components/ColorPicker';
import classNames from 'classnames';
import WebFont from 'webfontloader';

const supaBaseUrl = 'https://vuqbxohgmdijaofjmhwt.supabase.co/';
const supaBaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cWJ4b2hnbWRpamFvZmptaHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwNDUwMzMsImV4cCI6MjAxMjYyMTAzM30.WmAeqNmSz3BpfTdq_WOS6bGGEdlGyTWjS1KyyXdokl8'; // Replace with your Supabase API key
const storageURLExtension = '/storage/v1/object/public/';

const supabaseClient = createClient(
  supaBaseUrl,
  supaBaseAPIKey
);

function UserProfile({ session, user }) {
  const [newSession, setNewSession] = useState(session);
  const [newUser, setNewUser] = useState(user);
  const [userDb, setUserDb] = useState(null);
  const [userRecipes, setUserRecipes] = useState(null);
  const [images, setImages] = useState([]);
  const [bkcolor, setbkcolor] = useState("#EDED8C");
  const [showColorPicker, setShowColorPicker] = useState(false); // State to toggle the ColorPicker

  useEffect(() => {
    if (session) {
      setNewSession(session);
    }
    if (user) {
      setNewUser(user);
    }
    const getUser = async () => {
      if (user) {
        const { data, error } = await supabaseClient
          .from('user')
          .select('*')
          .eq('email', user.email)
          .single();
        if (error) {
          console.log(error);
        }
        setUserDb(data);
      }
    };
    const getRecipes = async () => {
      if (user) {
        const { data, error } = await supabaseClient
          .from('recipes')
          .select('*')
          .eq('author', user.email);
        if (error) {
          console.log(error);
        }
        setUserRecipes(data);
      }
    };
    getRecipes();
    getUser();
  }, [session, user]);

  // Load Google Fonts
  WebFont.load({
    google: {
      families: ['Pacifico', 'cursive']
    },
  });

  const fileInputRef = useRef(null);

  function handleOpenFileDialog() {
    fileInputRef.current.click();
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const bucketName = 'profile_photo';
      const filePath = `${userDb.email}/${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading file:', error);
      } else {
        console.log('File uploaded successfully:', data);
        const uploadedImageUrl = supaBaseUrl + storageURLExtension + bucketName + '/' + data.path;

        setImages((prevImages) => [...prevImages, uploadedImageUrl]);
      }
    }
  }

  const styles = {
    backgroundColor: bkcolor,
    fontFamily: 'Pacifico, cursive',
  };

  return (
    <div className="min-h-screen min-w-max backgroundUser">
      <NavBar />
      <p style={{ fontSize: '34px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'Pacifico, cursive' }}>👨‍🍳 User Profile 👨‍🍳</span>
      </p>
      <br></br>
      <div className="user-profile-container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <div className="user-main-card" style={styles}>
          <img
            src="/images/NoUserPicture.jpg"
            alt="User"
            style={{ width: '100%' }}
          />
          <h1 className="user-name">{userDb?.username}</h1>
          <h2> {userDb?.email} </h2>
          <p className="user-info">
            Followers: {userDb?.followers} | Following: {userDb?.following}
          </p>
          <button className="see-recipes-button" onClick={() => window.location.href = "/my-recipes"}>See Recipes</button>
          <button className="toggle-color-picker-button see-recipes-button" onClick={() => setShowColorPicker(!showColorPicker)}>
            {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
          </button>
        </div>

        <div>
          {showColorPicker && <ColorPicker color={bkcolor} handleColorChange={(event) => setbkcolor(event.hex)} />}
        </div>
      </div>

      <div>
        <div className="user-picture-section card">
          <h1 className="my-dishes-title">#MyDishes</h1>
          <div className="picture-grid">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt="Uploaded"
              className="grid-image cool-border-image" /* Apply the cool-border-image class */
            />
          ))}
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
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
