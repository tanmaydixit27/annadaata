import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <p>
        Made with <span className="love">❤️</span> by Tanmay Narain Dixit
      </p>
      <div className="social-links">
        <a
          href="https://github.com/tanmaydixit27"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/company/anndaata-food-services/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:anndaataofficial@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Gmail"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.instagram.com/anndaataofficial/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
      <p>&copy; 2024 Anndaata. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
