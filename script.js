document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');
    const restaurantList = document.querySelector('.restaurant-list');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        filterRestaurants(query);
    });

    function filterRestaurants(query) {
        const restaurants = restaurantList.querySelectorAll('.restaurant');
        restaurants.forEach(function(restaurant) {
            const restaurantName = restaurant.querySelector('h3').textContent.toLowerCase();
            const restaurantCuisine = restaurant.querySelector('p').textContent.toLowerCase();
            if (restaurantName.includes(query) || restaurantCuisine.includes(query)) {
                restaurant.style.display = 'block';
            } else {
                restaurant.style.display = 'none';
            }
        });
    }
});
const menuButton = document.createElement('button');
menuButton.textContent = 'Menu';
menuButton.classList.add('menu-button');
document.querySelector('header .container').appendChild(menuButton);

menuButton.addEventListener('click', function() {
    const restaurantList = document.querySelector('.restaurant-list');
    if (restaurantList.style.display === 'none' || restaurantList.style.display === '') {
        restaurantList.style.display = 'flex';
    } else {
        restaurantList.style.display = 'none';
    }
});




const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let restaurants = [
    { id: 1, name: 'BREWTIFUL CAFE', cuisine: 'Italian, Pizza' },
    { id: 2, name: 'MAXI CAFE', cuisine: 'Chinese, Noodles' },
    { id: 3, name: 'BISTRO', cuisine: 'Indian, Curry' }
];

let martItems = [
    { id: 1, name: 'Groceries', category: 'Vegetables, Fruits & More' },
    { id: 2, name: 'Beverages', category: 'Soft Drinks & Juices' },
    { id: 3, name: 'Snacks', category: 'Chips & Biscuits' }
];

app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

app.get('/mart', (req, res) => {
    res.json(martItems);
});

app.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    newRestaurant.id = restaurants.length + 1;
    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
});

app.post('/mart', (req, res) => {
    const newMartItem = req.body;
    newMartItem.id = martItems.length + 1;
    martItems.push(newMartItem);
    res.status(201).json(newMartItem);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/language', (req, res) => {
    res.json({ language: 'JavaScript' });
});



// Function to add items to cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        // If item exists, increase quantity
        cart[itemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Function to load cart items in cart.html
function loadCart() {
    const cartContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = ""; // Clear previous content
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
    }

    cartTotal.textContent = total.toFixed(2);
}

// Function to remove an item from the cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// Load cart items when the cart page is opened
if (document.querySelector(".cart-items")) {
    document.addEventListener("DOMContentLoaded", loadCart);
}







// Function to load cart items
function loadCart() {
    const cartContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
    }

    cartTotal.textContent = total.toFixed(2);
}

// Function to remove an item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to clear cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// Function to simulate payment
function proceedToPayment() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = document.getElementById("cart-total").textContent;

    if (cart.length === 0) {
        alert("Your cart is empty. Add some items before proceeding to payment.");
        return;
    }

    let confirmPayment = confirm(`Your total is ₹${totalAmount}. Do you want to proceed with the payment?`);
    
    if (confirmPayment) {
        alert("Payment Successful! Thank you for your order.");
        localStorage.removeItem("cart");
        loadCart();
    }
}

// Load cart items when the cart page is opened
if (document.querySelector(".cart-items")) {
    document.addEventListener("DOMContentLoaded", loadCart);
}


