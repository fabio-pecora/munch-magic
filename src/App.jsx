import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
function App() {

  const [session, setSession] = useState(null);


  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      setSession(session);
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
      element: <Home />,
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
      element: (props) => <Home {...props} session={session} />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;