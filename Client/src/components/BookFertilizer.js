import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import './BookFertilizer.css';
import axios from 'axios';
import dap from '../assets/fertilizers/dap.jpg';
import mop from '../assets/fertilizers/mop.jpg';
import npk from '../assets/fertilizers/npk.jpg';
import urea from '../assets/fertilizers/urea.jpg';
import organic from '../assets/fertilizers/organic.jpg';

const BookFertilizer = () => {
  const fertilizersData = [
    { id: 1, name: 'Urea', price: 20, image: urea, description: 'Nitrogen-rich fertilizer' },
    { id: 2, name: 'DAP', price: 30, image: dap, description: 'Di-ammonium Phosphate' },
    { id: 3, name: 'MOP', price: 25, image: mop, description: 'Muriate of Potash' },
    { id: 4, name: 'NPK', price: 35, image: npk, description: 'Nitrogen, Phosphorus, and Potassium mix' },
    { id: 5, name: 'Organic Fertilizer', price: 50, image: organic, description: 'Eco-friendly organic fertilizer' },
  ];

  const addToCart = async (fertilizer) => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        ...fertilizer,
        quantity: 1,
      });
      alert(`${fertilizer.name} added to cart`);
    } catch (error) {
      console.error("Error adding to the cart:", error);
    }
  };

  return (
    <div className="book-fertilizer-container">
      <Typography variant="h4" className="title">Book a Fertilizer</Typography>
      <div className="fertilizers-list">
        {fertilizersData.map((fertilizer) => (
          <Card key={fertilizer.id} className="fertilizer-card">
            <CardMedia component="img" height="140" image={fertilizer.image} alt={fertilizer.name} />
            <CardContent>
              <Typography variant="h5">{fertilizer.name}</Typography>
              <Typography variant="body2" color="textSecondary">{fertilizer.description}</Typography>
              <Typography variant="h6" color="primary">Price: ₹{fertilizer.price} / bag</Typography>
              <TextField
                label="Quantity (bags)"
                type="number"
                variant="outlined"
                size="small"
                className="quantity-input"
                onChange={(e) => fertilizer.quantity = e.target.value}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(fertilizer)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookFertilizer;
