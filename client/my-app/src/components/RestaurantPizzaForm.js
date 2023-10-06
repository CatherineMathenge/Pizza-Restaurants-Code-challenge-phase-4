import React, { useState } from "react";

function RestaurantPizzaForm() {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: '',
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5555/restaurant_pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.join(', '));
      }

      
      setFormData({
        price: '',
        pizza_id: '',
        restaurant_id: '',
      });
      setErrors([]);
      alert('Restaurant Pizza created successfully!'); 
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <div>
      <h1>Add Restaurant Pizza</h1>
      {errors.length > 0 && (
        <div className="errors">
          <p>{errors.join(', ')}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pizza_id">Pizza ID:</label>
          <input
            type="number"
            id="pizza_id"
            name="pizza_id"
            value={formData.pizza_id}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurant_id">Restaurant ID:</label>
          <input
            type="number"
            id="restaurant_id"
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleInputChange}
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="my-button">Add Pizza</button>
      </form>
    </div>
  );
}

export default RestaurantPizzaForm;
