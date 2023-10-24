/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import "./recipe.css";
import { supabase } from '../lib/supabaseClient';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';

const CreateRecipe = ({session, user}) => {

  const [userEmail, setUserEmail] = useState(null);
  const [message, setMessage] = useState(''); // Add this line

  const [recipeData, setRecipeData] = useState({
    recipeName: '',
    description: '',
    serving: 0,
    prepTime: 0,
    cookTime: 0,
    instructions: '',
    image: '',
    // eslint-disable-next-line react/prop-types
    author: session.data.session.user?.email,
  });

  useEffect(() => {
    setUserEmail(session.data.session.user?.email);
  }, [user]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
    console.log(recipeData);
  };
  

  const handleRecipeSubmit = async (e) => {
    e.preventDefault(); 
    console.log('Form submitted'); 

    console.log(recipeData);

    const currentDate = new Date().toISOString(); 

    
    try {
      console.log('Attempting to insert recipe');
      const { data, error } = await supabase
        .from('recipes')
        .insert([
          {
            recipeName: recipeData.recipeName,
            description: recipeData.description, 
            serving: recipeData.serving,
            prepTime: recipeData.prepTime,
            cookTime: recipeData.cookTime,
            instructions: recipeData.instructions,
            image: recipeData.image,
            author: recipeData.author,
            creation_date: currentDate,
          },
        ]);
      if (error) {
        console.error('Error inserting recipe:', error);
        setMessage('Recipe Failed to insert try again.'); // Add this line
      } else {
        console.log('Recipe inserted successfully:', data);
        setMessage('Recipe inserted successfully.'); // Add this line
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    console.log('Form submission complete');
  };
  
  if(!session) {
    return (
      <>
      <div className="App">
        <NavBar />
        <section className="hero h-3/4 bg-pink-200">

          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Please Login</h1>
              <Link to="/login" className="ml-4 text-lg text-gray-800">
                Login
              </Link>
              <Link to="/register" className="ml-4 text-lg text-gray-800">
                Register
              </Link>
            </div>
          </div>
          </section>
        </div>
      </>
    )
  }
  else
  return (
    <>
    <NavBar />
    <div className="min-w-screen min-h-screen recipebg">
    
    <div className="recipe-create-container">
      <h1>Create a New Recipe</h1>
      <p>{message}</p> {/* Display the message */}
      <form onSubmit={handleRecipeSubmit}>
        <div>
          <label>Recipe Name</label>
          <input
            type="text"
            name="recipeName"
            value={recipeData.recipeName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={recipeData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Serving</label>
          <input
            type="number"
            name="serving"
            value={recipeData.serving}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Preparation Time (minutes)</label>
          <input
            type="number"
            name="prepTime"
            value={recipeData.prepTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookTime"
            value={recipeData.cookTime}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={recipeData.instructions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={recipeData.image}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  </div>
  </>
  );
};

export default CreateRecipe;
