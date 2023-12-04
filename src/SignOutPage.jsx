import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';


const SignOutPage = () => {
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            window.location.href = '/';
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    };

    signOut();
  }, []);

  return (
    <div>
      <h1>Signed Out!</h1>
      <p>Sorry to see you go!</p>
      <button className='btn '>
      <a href="/">Go Home</a>
      </button>
    </div>
  );
};

export default SignOutPage;