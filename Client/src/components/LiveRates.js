import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import './LiveRates.css';
import axios from 'axios';
import wheat from '../assets/wheat.jpg';
import rice from '../assets/rice.jpg';
import mustard from '../assets/mustard.jpg';
import almonds from '../assets/almonds.jpg';
import Maize from '../assets/Maize.jpg';
import dates from '../assets/dates.jpg';

const LiveRates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  //const [cart, setCart] = useState([]);

  const grainsData = [
    { id: 1, name: 'Wheat', price: 30, image: wheat, description: 'Quality wheat grain' },
    { id: 2, name: 'Rice', price: 40, image: rice, description: 'Premium basmati rice' },
    { id: 3, name: 'Maize', price: 25, image: Maize, description: 'Fresh maize grain' },
    { id: 4, name: 'Mustard', price: 20, image: mustard, description: 'Quality Mustard grain' },
    { id: 5, name: 'Dates', price: 100, image: dates, description: 'Premium Dates' },
    { id: 6, name: 'Almonds', price: 70, image: almonds, description: 'Fresh Almonds' },
  ];
  const filteredGrains = grainsData.filter((grain) =>
    grain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = async(grain) => {
    try{
        await axios.post('http://localhost:5000/api/cart',{
            ...grain,
            quatity: 1,
        });
        alert(`${grain.name} added to cart`);
    }catch(error){
        console.error("Error adding to the cart:",error);
    }
  };
  return (
    <div className="live-rates-container">
      <Typography variant="h4" className="title">Live Rates of Grains</Typography>
      <TextField
        label="Search Grains"
        variant="outlined"
        size="small"
        fullWidth
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grains-list">
        {filteredGrains.length > 0 ? (
          filteredGrains.map((grain) => (
            <Card key={grain.id} className="grain-card">
              <CardMedia component="img" height="140" image={grain.image} alt={grain.name} />
              <CardContent>
                <Typography variant="h5">{grain.name}</Typography>
                <Typography variant="body2" color="textSecondary">{grain.description}</Typography>
                <Typography variant="h6" color="primary">Price: ₹{grain.price} / kg</Typography>
                <TextField
                  label="Quantity (kg)"
                  type="number"
                  variant="outlined"
                  size="small"
                  className="quantity-input"
                  onChange={(e) => grain.quantity = e.target.value}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(grain)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" className="no-results">
            No results found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default LiveRates;
