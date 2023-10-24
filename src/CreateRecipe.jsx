import React, { useState } from 'react';
import "./recipe.css";
import { supabase } from '../lib/supabaseClient';

const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    recipeName: '',
    description: '',
    serving: null,
    prepTime: null,
    cookTime: null,
    instructions: '',
    image: '',
    author: '',
    creation_date: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  

  const handleRecipeSubmit = async (e) => {
    e.preventDefault(); 
    console.log('Form submitted'); 


    const currentDate = new Date().toISOString(); 

    
    try {
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
      } else {
        console.log('Recipe inserted successfully:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <div className="recipe-create-container">
      <h1>Create a New Recipe</h1>
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
  );
};

export default CreateRecipe;
