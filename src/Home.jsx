import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css"

const Home = ({session, user}) => {

    const [loading, setLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      if (session) {
        setIsLogged(true);
      }
    } , [session])

    if(isLogged) {
      return (
        <>
        <div className="App bg-pink-200 min-h-screen">
          <NavBar />
          <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-red-900 text-center">Welcome Back! {user ? user.email : "Loading.."}</h1>
                <p className="py-6 text-red-900 text-center"> You have no new updates, however, you should create a new recipe to share! </p>
                <ul className="steps ml-32 mx-auto text-center justify-center self-center text-red-800 font-extrabold">
                <li className="step step-primary" data-content="🍲">Make A Recipe</li>
                <li className="step step-secondary" data-content="🍚">Write Recipe </li>
                <li className="step step-info" data-content="🍧"> Rate Recipes </li>
                <li className="step step-success" data-content="😍">Share Recipe</li>
                <li className="step step-error" data-content="🥸">Review Recipes</li>
              </ul>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="stats-vertical shadow">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div className="stat-title">Recipe's Created</div>
                  <div className="stat-value">3</div>
                  <div className="stat-desc">Last Recipe Oct 24th</div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  </div>
                  <div className="stat-title">Following</div>
                  <div className="stat-value">0</div>
                  <div className="stat-desc">↗︎ Last Followed: </div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                  </div>
                  <div className="stat-title">Total Recipes by Users</div>
                  <div className="stat-value">0</div>
                  <div className="stat-desc">↘︎ (30 in last 30 days) </div>
                </div>
                
              </div>
              
              </div>
              
            </div>
            
          </div>
        </div>
      </>
      )
    }
    
    else {
    return (
<section className="hero h-3/4 min-h-screen bg-pink-200" style={{ backgroundImage: `url('https://img.freepik.com/free-vector/hand-drawn-cute-food-frame-background_23-2149602177.jpg')` }}>      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">Join us and start your food journey.</p>
          <Link to="/login" className="btn btn-primary mr-4">Log In</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </section>
    )
  }
}

export default Home
