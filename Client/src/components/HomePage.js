import React from 'react';
import './HomePage.css';
import wheat from '../assets/wheat.jpg';
import rice from '../assets/rice.jpg';
import mustard from '../assets/mustard.jpg';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="about-section">
        <div className="about-content">
          <h2>About</h2>
          <p>
            Founded in 2024, Anndaata is known for revolutionizing the way people eat and enjoy food.
            We take pride in our ability to discover the most unique flavors from around India. Join us.
          </p>
        </div>
      </section>

      <section className="opening-hours-section">
        <div className="opening-hours-content">
          <h2>Opening Hours</h2>
          <p>Dine In or Take Away</p>
          <p>Monday - Saturday: 11am - 11pm</p>
          <p>Sunday: 11am - 7pm</p>
        </div>
      </section>

      <section className="services-section">
        <div className="service-card">
          <img src={wheat} alt="Service 1" />
          <h3>Premium Wheat/Flour Supply</h3>
          <p>30 minutes</p>
          <p>₹35</p>
        </div>
        <div className="service-card">
          <img src={rice} alt="Service 2" />
          <h3>Organic Rice Selection</h3>
          <p>30 minutes</p>
          <p>₹45</p>
        </div>
        <div className="service-card">
          <img src={mustard} alt="Service 3" />
          <h3>Mustard Magic Oil</h3>
          <p>25 minutes</p>
          <p>₹50</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
