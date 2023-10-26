import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./RecipePage.css";
import { supabase } from '../lib/supabaseClient';

const RecipePage = () => {
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
    <div className="recipe-page">
      <div className="recipe-title">
        <h1>{recipe.recipeName}</h1>
      </div>

      <div className="flex-container">
        <div className="flex-item">
            <img src={recipe.image} alt={recipe.recipeName} className="recipe-image" />
        </div>

        <div className="flex-item">
           <h2 className='h2' style={{ marginBottom: '50px' }}>Description</h2>
           <p ><strong>{recipe.description}</strong></p>
        </div>
     </div>

     <div className="flex-container">
        <div className="flex-item">
          <h2 className='h2'>Created By:</h2>
          <p><strong>{recipe.author}</strong></p>
          <h2 className='h2'>Date:</h2>
          <p><strong>{recipe.creation_date}</strong></p>
        </div>

        <div className="flex-item">
          <p><h2 className='h2'>Serving:</h2><strong>{recipe.serving}</strong></p>
          <p><h2 className='h2'>Preparation Time:</h2><strong>{recipe.prepTime}</strong></p>
          <p><h2 className='h2'>Cooking Time:</h2><strong>{recipe.cookTime}</strong></p>
        </div>

        <div className="flex-item">
         <h2 className='h2'>Instuction</h2>
          <p><strong>{recipe.instructions}</strong></p>
        </div>
        
      </div>
    </div>
  );
};

export default RecipePage;
