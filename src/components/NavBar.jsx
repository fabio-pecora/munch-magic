
import { useState } from "react";

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
        <a href="/" className="text-2xl font-bold text-gray-800">
          Home
        </a>
        {loggedIn && (
          <a href="/my-recipes" className="ml-4 text-lg text-gray-800">
            My Recipes
          </a>
        )}
      </div>
      <div className="flex items-center">
        {loggedIn && (
          <a href="/account-settings" className="mr-4 text-lg text-gray-800">
            Account Settings
          </a>
        )}
        <button
          onClick={loggedIn ? handleLogout : handleLogin}
          className="btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          {loggedIn ? "Log Out" : "Log In"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
