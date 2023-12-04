import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css"
import CustomImage from "./components/CustomImage";
import Footer from "./components/Footer";

const Home = ({session, user}) => {

  const images =[
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img9.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg"
  ]

  const list =[
    "Make A Recipe",
    "Write Recipe",
    "Rate Recipes",
    "Share Recipe",
    "Review Recipes"
  ]

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
      <NavBar />
      <div className="container main">
        <div className="section home">
          <div className="col type">
            <h1 className="title">Welcome Back! {user ? user.email : "Loading.."}</h1>
            <p className="info"> You have no new updates, however, you should create a new recipe to share! </p>
            <ul className="steps">
            <p className="info">Munch Magic is your go-to community for culinary enthusiasts. Discover, share, and connect over a diverse array of recipes, whether you're a seasoned chef or just starting out. Join us in celebrating the joy of cooking, where every dish has a story, and every recipe is a shared experience. Welcome to a world where the magic of food brings people together!</p>
            </ul>
          </div>
          <div className="col gallery">
            {images.map((src, index) => (
              <CustomImage key={index} imgSrc={src} pt={"80%"}/>
            ))}
          </div>
        </div>

        <div className="section second">
            <div className="col img">
                <img src="/images/img13.jpg" alt="" />
          
            </div>
            <div className="col type">
                <h1 className="title">Follow Steps</h1>
                {list.map((item, index) => (
                    <p className="steps" key={index}>{item}</p>
                ))}
                
                <button className="btn">Sign Up Now</button>            </div>
           
        </div>
      </div>
      <Footer />
      </>
    )
  }
  else {
    return (
      <div className="main container flex flex-row items-center justify-center min-h-screen min-w">
        <div className="col type text-center">
          <h1 className="title">Welcome Back! </h1>
          <p className="info"> lets get you logged in or registered here! </p>
        
        </div>
        <div className="section second flex flex-col items-center min-h-screen">
          <Link to="/login" className="btn btn-primary mr-4">Log In</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
          
    )
  }
}

export default Home