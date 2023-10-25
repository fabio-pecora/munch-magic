import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const RecipePage = () => {
  const { id } = useParams(); // Extract id from URL parameters
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
    <div>
      <h1>{recipe.recipeName}</h1>
      <p>{recipe.author}</p>
      <p>{recipe.description}</p>
      <p>{recipe.prepTime}</p>
      <p>{recipe.cookTime}</p>
      <p>{recipe.instructions}</p>
      <p>{recipe.image}</p>
      <p>{recipe.serving}</p>

      {/* Render other recipe details... */}
    </div>
  );
};

export default RecipePage;