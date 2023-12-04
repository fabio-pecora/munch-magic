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
<nav className="navbar container">
  <div className="flex items-center">
    <Link to="/" className="logo">
      M<span>un</span>chMagic
    </Link>
  </div>
  <div className="nav-links">
  {loggedIn && (
      <>
        <Link to="/my-recipes" className="active">
          My Recipes
        </Link>
        <Link to="/CreateRecipe" className="">
          Create Recipe
        </Link>
      </>
    )}
    <Link to="/profile">
      Profile
    </Link>
    <Link to="/about" >
      About
    </Link>
    <button
      onClick={handleLogout}
      className="btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded m-4"
    >
      Logout
    </button>
  </div>
</nav>
  );
};

export default NavBar;
