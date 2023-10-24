import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import Login from './Login'
import Register from './Register';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
function App() {

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      setSession(session.data.session);
      setUser(session.data.session.user);
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
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;