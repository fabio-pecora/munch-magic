import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const SignOutPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            navigate('/');
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    };

    signOut();
  }, [navigate]);

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