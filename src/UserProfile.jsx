import React, { useState, useRef, useEffect } from 'react';
import NavBar from './components/NavBar';
import './UserProfile.css'; // Import your CSS file
import { createClient } from '@supabase/supabase-js';
import { SketchPicker } from 'react-color';
import ColorPicker from './components/ColorPicker';
import { redirect } from 'react-router-dom';
import classNames from 'classnames';

const supaBaseUrl = 'https://vuqbxohgmdijaofjmhwt.supabase.co/';
const supaBaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cWJ4b2hnbWRpamFvZmptaHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwNDUwMzMsImV4cCI6MjAxMjYyMTAzM30.WmAeqNmSz3BpfTdq_WOS6bGGEdlGyTWjS1KyyXdokl8';
const storageURLExtension = '/storage/v1/object/public/'

const supabaseClient = createClient(
  supaBaseUrl,
  supaBaseAPIKey
);

function UserProfile({ session, user }) {
  const [newSession, setNewSession] = useState(session);
  const [newUser, setNewUser] = useState(user);
  const [userDb, setUserDb] = useState(null);
  const [userRecipes, setUserRecipes] = useState(null);
  const [images, setImages] = useState([]); // Store uploaded images
  const [bkcolor, setbkcolor] = useState("#E3E3DC");
  useEffect(() => {
    if (session) {
      setNewSession(session);
    }
    if (user) {
      setNewUser(user);
    }
    const getUser = async () => {
      if (user) { // Check if user exists
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
      if (user) { // Check if user exists
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


  const fileInputRef = useRef(null);

  function handleOpenFileDialog() {
    fileInputRef.current.click();
  }

  

  async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const bucketName = 'profile_photo'; // Replace with your actual bucket name
      const filePath = `${userDb.email}/${file.name}`; // Define the file path
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading file:', error);
      } else {
        console.log('File uploaded successfully:', data);
        const uploadedImageUrl = supaBaseUrl + storageURLExtension + bucketName + '/' + data.path;
        // Add the uploaded image to the images array
        setImages((prevImages) => [...prevImages, uploadedImageUrl]);
      }
    }
    
  }

  const styles = {
    backgroundColor: bkcolor
	}

  return (
    <div>
      <NavBar />




      <div className="user-profile-container" style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
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
          <button className="see-recipes-button" onClick={()=> location.href = "/my-recipes"}>See Recipes</button>
        </div>

        <div>
          <ColorPicker color={bkcolor} handleColorChange={(event)=>setbkcolor(event.hex)} />
          <p class="center">Style your card!!</p>
        </div>
      </div>







      <div>
        <div className="user-picture-section card">
            <h1 className="my-dishes-title">#MyDishes</h1>
            <div className="picture-grid">
              {images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt="Uploaded" className="grid-image" />
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
                style={{ display: 'none' }}/>
            </div>
          </div>
      </div>
    </div>
  );
}

export default UserProfile;
