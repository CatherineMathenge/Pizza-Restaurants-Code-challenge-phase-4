from dbconfig import db
from sqlalchemy.orm import validates

class Pizza(db.Model):
    __tablename__ = 'pizza'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float)

    restaurants = db.relationship('RestaurantPizza', back_populates='pizza')

    @validates('price')
    def validate_price(self, key, value):
        if not (1 <= value <= 30):
            raise ValueError("Price must be between 1 and 30")
        return value

class Restaurant(db.Model):
    __tablename__ = 'restaurant'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)

    pizzas = db.relationship('RestaurantPizza', back_populates='restaurant')

class RestaurantPizza(db.Model):
    __tablename__ = 'restaurant_pizza'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'))

    restaurant = db.relationship('Restaurant', back_populates='pizzas')
    pizza = db.relationship('Pizza', back_populates='restaurants')

    @validates('price')
    def validate_price(self, key, value):
        if not (1 <= value <= 30):
            raise ValueError("Price must be between 1 and 30")
        return value
