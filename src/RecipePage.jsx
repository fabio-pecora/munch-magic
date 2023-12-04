import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('recipeID', id)
        .single();

      if (error) {
        console.error('Error fetching recipe:', error);
      } else {
        setRecipe(data);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <NavBar />
      <div className="container main">
      <div className="section second details">
        <div className="col img">
          <img src={recipe.image} alt={recipe.recipeName} />
        </div>
        <div className="col type">
          <h1 className="title">{recipe.recipeName}</h1>
          <p className="info">{recipe.description}</p>
        </div>
      </div>

      <div className="section second details">
        <div className="col type">
          <h2 className='stitle'>Ingredients</h2>
          {recipe.ingredients && recipe.ingredients.map((item, index) => (
            <p className="steps" key={index}>{item}</p>
        ))}
        </div>
        <div className="col type">
          <h3 className='stitle'>Serving</h3>
          <p className="steps">{recipe.serving} persons</p>
          <h3 className='stitle'>Preparation Time</h3>
          <p className="steps">{recipe.prepTime} min</p>
          <h3 className='stitle'>Cooking Time</h3>
          <p className="steps">{recipe.cookTime} min</p>
        </div>
        <div className="col type">
          <h2 className='stitle'>Instruction</h2>
          <p className="info">{recipe.instructions}</p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default RecipePage;