from flask import Flask, jsonify, request
from flask_cors import CORS
from dbconfig import db  
from models import Pizza, Restaurant, RestaurantPizza

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurant.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    restaurant_data = [
        {"id": restaurant.id, "name": restaurant.name, "address": restaurant.address}
        for restaurant in restaurants
    ]
    return jsonify(restaurant_data)

@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant_by_id(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        pizzas = [
            {"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients}
            for pizza in restaurant.pizzas
        ]
        restaurant_data = {
            "id": restaurant.id,
            "name": restaurant.name,
            "address": restaurant.address,
            "pizzas": pizzas
        }
        return jsonify(restaurant_data)
    return jsonify({"error": "Restaurant not found"}), 404

@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant_by_id(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        db.session.delete(restaurant)
        db.session.commit()
        return jsonify({'message': 'Restaurant deleted successfully'}), 200
    return jsonify({'message': 'Restaurant not found'}), 404

@app.route('/pizzas', methods=['GET'])
def get_all_pizzas():
    pizzas = Pizza.query.all()
    pizza_data = [
        {"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients}
        for pizza in pizzas
    ]
    return jsonify(pizza_data)

@app.route('/restaurant_pizzas', methods=['GET'])
def get_all_restaurant_pizzas():
    restaurant_pizzas = RestaurantPizza.query.all()
    response_data = []
    for restaurant_pizza in restaurant_pizzas:
        pizza = Pizza.query.get(restaurant_pizza.pizza_id)
        restaurant = Restaurant.query.get(restaurant_pizza.restaurant_id)
        if pizza and restaurant:
            entry_data = {
                "pizza_id": restaurant_pizza.pizza_id,
                "restaurant_id": restaurant_pizza.restaurant_id,
                "price": restaurant_pizza.price,
                "pizza": {"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients},
                "restaurant": {"id": restaurant.id, "name": restaurant.name, "address": restaurant.address}
            }
            response_data.append(entry_data)
    return jsonify(response_data), 200

@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    try:
        data = request.get_json()
        price = data.get('price')
        pizza_id = data.get('pizza_id')
        restaurant_id = data.get('restaurant_id')
        restaurant_pizza = RestaurantPizza(price=price, pizza_id=pizza_id, restaurant_id=restaurant_id)
        db.session.add(restaurant_pizza)
        db.session.commit()
        pizza = Pizza.query.get(pizza_id)
        if pizza:
            pizza_data = {"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients}
            return jsonify(pizza_data), 201
        return jsonify({"error": "Pizza not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5555, debug=True)
