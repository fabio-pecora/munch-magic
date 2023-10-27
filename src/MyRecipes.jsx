import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import NavBar from './components/NavBar';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  
  const gradients = [
    'bg-gradient-to-r from-pink-100 to-red-100',
    'bg-gradient-to-r from-pink-200 to-red-200',
    'bg-gradient-to-r from-pink-300 to-red-300',
    'bg-gradient-to-r from-pink-100 to-red-200',
    'bg-gradient-to-r from-pink-200 to-red-100',
    'bg-gradient-to-r from-red-100 to-pink-100',
    'bg-gradient-to-r from-red-200 to-pink-200',
    'bg-gradient-to-r from-red-300 to-pink-300',
    'bg-gradient-to-r from-red-100 to-pink-200',
    'bg-gradient-to-r from-red-200 to-pink-100',
  ];

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
    <div className="min-h-screen " style={{backgroundImage: "url(https://img.pikbest.com/backgrounds/20190821/drawing-cartoon-cute-food-banner-background_2759254.jpg!bwr800)", backgroundRepeat: "repeat"}}>
      <NavBar />
      <div className=" mt-5 min-w-full flex justify-center justify-self-center">
      <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-red-500 py-2 px-4 rounded-full inline-block text-center">
  My Recipes
</h1>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 p-10">
        {recipes.length === 0 && <div>Loading...</div>}
        {recipes.map((recipe) => (
            <Link
              to={`/recipes/${recipe.recipeID}`}
              key={recipe.recipeID}
              className={`block p-4 border rounded-xl shadow hover:shadow-lg transition ${gradients[Math.floor(Math.random() * gradients.length)]}`}
            >
              <div className="card bordered">
                <figure>
                  {/* Add image if available */}
                  <img src={recipe.image} onError={(e) => {e.target.onerror = null; e.target.src="https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg"}} width={"50%"} height = {100} className="p-2" />
                </figure> 
                <div className="card-body">
                  <p className="text-center text-2xl font-bold"> {recipe.recipeName} </p>
                  <p>{recipe.description.split(' ').slice(0, 10).join(' ')}...</p>
                </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default MyRecipes;