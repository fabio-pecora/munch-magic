import React from 'react';
import NavBar from './components/NavBar';

const About = () => {
    
  return (
    <>
    <NavBar/>
    <div className="container main">
    <section id="about-head" className="section-p1">

    <div className="flogo">
    <h1 >M<span>unch</span> Magic</h1>


       <img className="image" src="https://www.teambonding.com/wp-content/uploads/2021/02/International-Food-Tour-world-map-1024x683.jpg" alt=""></img>
    </div>

       
      <div>
        <h2 >About Us</h2>
        <p>
          Welcome to Munch Magic, your culinary community where the magic of
          food brings people together! We are passionate about creating a
          platform for food enthusiasts to discover, share, and connect over a
          diverse array of recipes. Whether you're a seasoned chef or just
          starting out on your culinary journey, Munch Magic is here to
          celebrate the joy of cooking.
        </p>
        <p>
          Our platform allows you to explore a wide variety of recipes
          contributed by our vibrant community. From mouth-watering entrees to
          delightful desserts, you'll find inspiration for every occasion.
        </p>
      </div>

     
    </section>
   


        
      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/259/259164.png"
            alt=""
          ></img>
          <h6>Recipe Discovery</h6>
        </div>
        <div className="fe-box">
          <img
            src="https://static.thenounproject.com/png/590522-200.png"
            alt=""
          ></img>
          <h6>Contribution</h6>
        </div>
        <div className="fe-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/902/902765.png"
            width="70%"
            alt=""
          ></img>
          <h6>Social Features</h6>
        </div>
        <div className="fe-box">
          <img
            src="https://static.thenounproject.com/png/16600-200.png"
            alt=""
          ></img>
          <h6>Review and Rating System</h6>
        </div>
      </section>
      </div>
      </>
  );
};

export default About;
