import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import NavBar from './components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faPlus } from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer';

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
    <>
    <NavBar />
    <div className="container main">
    <section className='Recipe-section'>
      <h2 className='heading'>My<span>Recipes</span></h2>
      <aside className="sidebar">
        <Link to="/create-recipe">
          <button className="btn">
            <FontAwesomeIcon icon={faPlus} /> New Recipe
          </button>
        </Link>
        <div className='search-box'>
          <input type="text" placeholder="search for recipe"></input>
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </aside>
      <div className='recipe-gallery'>
        {recipes.map((recipe, index) => (
          <div className='recipe-img' key={index}>
            <img src={recipe.image} alt=""></img>
            <div className="inner-text">
              <h2>{recipe.recipeName}</h2>
              <p>{recipe.description}</p>
            </div>
            <Link to={`/recipes/${recipe.recipeID}`}>
              <button className="btn">Ingredients</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
    </div>
    <Footer />
    </>
  );
}

export default MyRecipes;