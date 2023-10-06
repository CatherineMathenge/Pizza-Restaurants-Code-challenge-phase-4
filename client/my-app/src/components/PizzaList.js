import React, { useEffect, useState } from 'react';

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/pizzas')
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setPizzas(data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);
  
  return (
    <div className="container"> 
      <h1 className="pizza-header">Pizza List</h1> 
      <ul className="pizza-list"> 
        {pizzas.map((pizza) => (
          <li key={pizza.id} className="pizza-item">
            <h2 className="pizza-name">{pizza.name}</h2> 
            <p className="pizza-ingredients">Ingredients: {pizza.ingredients}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;
