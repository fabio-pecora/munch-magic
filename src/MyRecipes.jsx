import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import NavBar from './components/NavBar';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('author', user.email);
      if (error) {
        console.error('Error fetching recipes:', error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-bold">My Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Link to={`/recipes/${recipe.recipeID}`} key={recipe.recipeID} className="block p-4 border rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold">{recipe.recipeName}</h2>
            <p>{recipe.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyRecipes;