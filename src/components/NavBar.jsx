import { useState } from "react";
import { supabase } from  "../../lib/supabaseClient"
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  let navigate = useNavigate();
  
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    console.log("Logging out");
    navigate("/sign-out");
  };

  return (
    <nav className="bg-yellow-200 border-b-2 border-yellow-300 flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Home
        </Link>
        {loggedIn && (
          <>
          <a href="/my-recipes" className="ml-4 text-lg text-gray-800">
            My Recipes
          </a>
          <Link to="/CreateRecipe" className="ml-4 text-lg text-gray-800">
            Create Recipe
          </Link>
          </>
        )}
      </div>
      <div className="flex items-center">
        {loggedIn && (
          <a href="/account-settings" className="mr-4 text-lg text-gray-800">
            Account Settings
          </a>
        )}
        <button
          onClick={handleLogout}
          className="btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          {"Logout"}
        </button>
        <Link to="/profile"> {/* Use Link for Profile button */}
          <button
            className="btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Profile
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
