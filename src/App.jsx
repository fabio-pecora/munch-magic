import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import Login from './Login'
import Register from './Register';
import UserProfile from './UserProfile'
import CreateRecipe from './MakeRecipe';
import MyRecipes from './MyRecipes';
import RecipePage from './RecipePage';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import SignOutPage from './SignOutPage';

function App() { 

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();


      if(session) {
      setSession(session.data.session);
      setUser(session.data.session.user);
      }
    }
    getSession();

    const mySubscription = supabase.auth.onAuthStateChange(
      async () => {
        const session = await supabase.auth.getSession();
        setSession(session);
      }
    );
    
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home session={session} user={user} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/profile",
      element: <UserProfile session = {session} user = {user}/>
    },
    {
      path: "/CreateRecipe", 
      element: <CreateRecipe session={session} user={user} />
    },

    {
      path: "/sign-out",
      element: <SignOutPage />,
    },
    {
      path: "/my-recipes",
      element: <MyRecipes session={session} user={user}/>,
    },
    {
      path: "/recipes/:id",
      element: <RecipePage session={session} user={user} />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;