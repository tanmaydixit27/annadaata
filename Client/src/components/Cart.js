// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  // Function to handle updating item quantity
  const updateQuantity = async (id, quantity) => {
    try {
      const updatedItem = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity });
      setCartItems(cartItems.map(item => item._id === id ? updatedItem.data : item));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Function to handle removing an item from the cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="cart-container">
      <Typography variant="h4" className="title">Your Cart</Typography>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <Card key={item._id} className="cart-item">
            <CardContent>
              <Typography variant="h5" className="item-name">{item.name}</Typography>
              <Typography variant="body2" className="item-description">{item.description}</Typography>
              <Typography variant="body2" className="item-price">Price: ₹{item.price} / kg</Typography>
              <TextField
                label="Quantity (kg)"
                type="number"
                variant="outlined"
                size="small"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, e.target.value)}
                className="quantity-input"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromCart(item._id)}
                className="remove-btn"
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography className="empty-cart-message">Your cart is empty</Typography>
      )}
    </div>
  );
};

export default Cart;
