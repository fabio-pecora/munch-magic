import { useState } from "react";
import { Link } from 'react-router-dom'; // Import Link component

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <nav className="bg-yellow-200 border-b-2 border-yellow-300 flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Home
        </Link>
        {loggedIn && (
          <Link to="/my-recipes" className="ml-4 text-lg text-gray-800">
            My Recipes
          </Link>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex">
          {loggedIn && (
            <Link to="/account-settings" className="mr-4 text-lg text-gray-800">
              Account Settings
            </Link>
          )}
          <button
            onClick={loggedIn ? handleLogout : handleLogin}
            className="btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            {loggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
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
