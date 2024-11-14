const products = [
    { id: 1, name: 'Product 1', price: 19.99, description: 'These  disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'tissue.webp' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'These  disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'tissue.webp' },
    { id: 3, name: 'Product 3', price: 39.99, description: 'These  disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'trial.png' },
    { id: 4, name: 'Product 4', price: 49.99, description: 'Description for Product 4', image: 'trial.png' },
    { id: 5, name: 'Product 5', price: 59.99, description: 'Description for Product 5', image: 'trial.png' },
    { id: 6, name: 'Product 6', price: 59.99, description: 'Description for Product 6', image: 'trial.png' },
    { id: 7, name: 'Product 7', price: 69.99, description: 'Description for Product 7', image: 'trial.png' }
];

let cart = [];

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="desc box">${product.description}</div>
                <p class="price">₹${product.price.toFixed(2)}</p>
                <button class="cart-button" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item'); // Add this class

        cartItem.innerHTML = `
            <div class="cart-card">
                <img src="${item.image}" alt="${item.name}">
                <span class="card-context">${item.name} - ₹<span class="cart-item-price">${item.price.toFixed(2)}</span> x <span class="cart-item-quantity">${item.quantity}</span></span>
                <div class="quantity-controls">
                    <button class="quantity-button" onclick="decreaseQuantity(${item.id})"><i class="fa-solid fa-minus"></i></button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-button" onclick="increaseQuantity(${item.id})"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // totalPriceElement.innerText = totalPrice.toFixed(2);
    cartCount.innerText = cart.length;

    // Call updateCartTotal after updating the cart
    updateCartTotal();
}

function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
    }
    updateCart();
}

function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-section').classList.toggle('show');
}

renderProducts();

// Set a fixed conversion rate (e.g., 1 USD = 83 INR)
// const usdToInrRate = 83;

// Update cart total calculation
function updateCartTotal() {
    // Ensure this selector matches the updated cart structure
    let cartItems = document.querySelectorAll('.cart-item');
    let productsPrice = 0;

    // Calculate total products price in USD
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.cart-item-price');
        const quantityElement = item.querySelector('.cart-item-quantity');
        const price = parseFloat(priceElement.innerText);
        const quantity = parseInt(quantityElement.innerText);

        productsPrice += price * quantity;
    });

    // Convert products price to INR
    let productsPriceInINR = productsPrice;

    // Calculate GST
    let gst = productsPriceInINR * 0.18;

    // Final Price
    let finalPrice = productsPriceInINR + gst; // No delivery charges as it's free

    // Update HTML elements
    document.getElementById('products-price').innerText = productsPriceInINR.toFixed(2);
    document.getElementById('gst').innerText = gst.toFixed(2);
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}