import React from 'react';
import './Aboutus.css';
//import annadaata from '../assets/annadaata.jpg'
import tanmay from '../assets/tanmay.png'
import ashirvad from '../assets/ashirvad.jpg';

const Aboutus = () => {
  return (
    <div className="about-page">
      <section className="about-overview">
        <div className="overview-content">
        <h2>About Anndaata</h2>
<p>
  Anndaata is a tech-driven startup that connects local farmers to consumers, offering precision farming solutions and a marketplace for fresh, sustainable produce while promoting education on nutrition and sustainable practices.
</p>
<ul>
  <li>Empowering farmers with advanced technology and analytics tools.</li>
  <li>Building a sustainable ecosystem for fresh and organic produce.</li>
  <li>Educating communities on nutrition, health, and sustainable living.</li>
  <li>Promoting transparency in the food supply chain.</li>
  <li>Enabling direct-to-consumer purchases of farm-fresh products through quick commerce solutions.</li>
  <li>Providing doorstep delivery of organic and fresh produce within hours of harvest.</li>
  <li>Supporting small-scale farmers with a digital marketplace to reach a broader audience.</li>
  <li>Ensuring fair pricing for both farmers and consumers by eliminating middlemen.</li>
  <li>Offering subscription services for regular delivery of seasonal and fresh products.</li>
  <li>Leveraging AI-driven tools to forecast demand and reduce food wastage.</li>
  <li>Promoting community-supported agriculture to build strong farmer-consumer relationships.</li>
</ul>

        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Buisness Leadership Team</h2>
        <div className="team-container">
          <div className="team-card">
            <img src={tanmay} alt="Founder" />
            <h3>Tanmay Narain Dixit</h3>
            <p>Founder & CTO</p>
            <p>
              With a passion for technology and agriculture, Tanmay founded Anndaata to bridge the gap between farmers and consumers. His vision drives innovation and growth within the company.
            </p>
          </div>
          <div className="team-card">
            <img src={ashirvad} alt="Co-Founder" />
            <h3>Ashirvad Yadav</h3>
            <p>Founder & CFO</p>
            <p>
              Ashirvad brings years of experience in sustainable agriculture and operations management. His leadership ensures Anndaata's seamless functionality and social impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
