import React from "react";
import { Route, Routes } from "react-router-dom"; 
import RestaurantList from "./RestaurantList";
import RestaurantDetail from "./RestaurantDetail";
import PizzaList from "./PizzaList";
import RestaurantPizzaForm from "./RestaurantPizzaForm";


  function App() {
    return (
      <div>
        <Routes> 
          
          <Route path="/" element={<RestaurantList />} />
  
          
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
  
         
          <Route path="/pizzas" element={<PizzaList />} />
  
          
          <Route path="/add-restaurant-pizza" element={<RestaurantPizzaForm />} />
  
          
        </Routes>
      </div>
    );
  }
  
  export default App;


