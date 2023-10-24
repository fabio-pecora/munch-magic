import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import Login from './Login'
import Register from './Register';
import CreateRecipe from './MakeRecipe';
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
      children: [
        {
          path: "/",
          element: (props) => <Home {...props} session={session} />,
        },
      ],
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
      path: "/CreateRecipe", 
      element: <CreateRecipe session={session} user={user} />
    },
    {
      path: "/sign-out",
      element: <SignOutPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;