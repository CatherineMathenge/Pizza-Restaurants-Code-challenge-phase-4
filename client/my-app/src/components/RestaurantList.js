// RestaurantList.js
import React, { useEffect, useState } from 'react';
import './RestaurantList.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    console.log('API request to /restaurants is being made');
    fetch('http://localhost:5555/restaurants')
      .then((response) => response.json())
      .then((data) => {
        console.log('API response data:', data);
        setRestaurants(data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);
  
  
  return (
    <div className="restaurant-list-container">
      <h1 className="restaurant-list-title">Pizza Restaurants</h1>
      <p className="restaurant-list-description">Your number one stop pizza shop  </p>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <h2 className="restaurant-name">{restaurant.name}</h2>
            <p className="restaurant-address">{restaurant.address}</p>
            <a className="view-details-link" href={`/restaurants/${restaurant.id}`}>
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
