from app import app, db
from models import Restaurant, Pizza, RestaurantPizza

def seed_data():
    with app.app_context():
        restaurant1 = Restaurant(name="Sottocasa NYC", address="298 Atlantic Ave, Brooklyn, NY 11201")
        restaurant2 = Restaurant(name="PizzArte", address="69 W 55th St, New York, NY 10019")

        pizza1 = Pizza(name="Cheese", ingredients="Dough, Tomato Sauce, Cheese")
        pizza2 = Pizza(name="Pepperoni", ingredients="Dough, Tomato Sauce, Cheese, Pepperoni")

        price1 = 10.99
        price2 = 12.99

        restaurant_pizza1 = RestaurantPizza(restaurant=restaurant1, pizza=pizza1, price=price1)
        restaurant_pizza2 = RestaurantPizza(restaurant=restaurant2, pizza=pizza2, price=price2)

        db.session.add_all([restaurant1, restaurant2, pizza1, pizza2, restaurant_pizza1, restaurant_pizza2])
        db.session.commit()

if __name__ == "__main__":
    seed_data()
    print("Sample data for two restaurants seeded successfully.")
