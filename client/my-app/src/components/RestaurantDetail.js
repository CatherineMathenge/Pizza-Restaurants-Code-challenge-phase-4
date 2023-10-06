import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Make an API call to get restaurant details by ID
    fetch(`http://127.0.0.1:5555/restaurants/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRestaurant(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [id]);

  const handleDelete = () => {
    // Make an API call to delete the restaurant by ID
    fetch(`http://127.0.0.1:5555/restaurants/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Restaurant deleted successfully, navigate to a different page
        navigate('/restaurants'); // Use navigate to go to a different route
      })
      .catch((error) => {
        console.error('Delete error:', error);
      });
  };

  return (
    <div className="restaurant-detail-container">
      {restaurant ? (
        <>
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-address">{restaurant.address}</p>
          <h2>Pizzas:</h2>
          <ul>
            {restaurant.pizzas.map((pizza) => (
              <li key={pizza.id}>
                <h3>{pizza.name}</h3>
                <p>Ingredients: {pizza.ingredients}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleDelete}>Delete Restaurant</button>
        </>
      ) : (
        <p className="loading-message">Loading restaurant details...</p>
      )}
    </div>
  );
}

export default RestaurantDetail;
