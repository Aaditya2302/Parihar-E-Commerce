const products = [
    { id: 1, name: 'Protecto 1', price: 19.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' },
    { id: 2, name: 'Protecto 2', price: 29.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' },
    { id: 3, name: 'Protecto 3', price: 39.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' },
    { id: 4, name: 'Protecto 4', price: 49.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' },
    { id: 5, name: 'Protecto 5', price: 59.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' },
    { id: 6, name: 'Protecto 6', price: 59.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' },
    { id: 7, name: 'Protecto 7', price: 69.99, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat. The covers are infused with natural fragrances, creating a refreshing, clean restroom experience.', image: 'sample.webp' }
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
        renderQuantityControl(productId);
    }

    updateCart();
}

function renderQuantityControl(productId) {
    const productCard = document.querySelector(`.product-card button[onclick="addToCart(${productId})"]`);
    if (productCard) {
        productCard.outerHTML = `
            <div id="quantity-control-${productId}" class="quantity-control">
                <button class="minus-btn" onclick="DecreaseQuantity(${productId})">-</button>
                <span id="quantity-${productId}">1</span>
                <button class="plus-btn" onclick="IncreaseQuantity(${productId})">+</button>
            </div>
        `;
    }
}

function restoreAddToCartButton(productId) {
    const quantityControl = document.getElementById(`quantity-control-${productId}`);
    if (quantityControl) {
        quantityControl.outerHTML = `<button class="cart-button" onclick="addToCart(${productId})">Add to Cart</button>`;
    }
}

function IncreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
    }
    updateCart();
}

function DecreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
        } else {
            removeFromCart(productId);
            restoreAddToCartButton(productId);
        }
    }
    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

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

    cartCount.innerText = cart.length;
    updateCartTotal();
}

function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
        } else {
            removeFromCart(productId);
            restoreAddToCartButton(productId);
        }
    }
    updateCart();
}

function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
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


function updateCartTotal() {
    let cartItems = document.querySelectorAll('.cart-item');
    let productsPrice = 0;

    cartItems.forEach(item => {
        const priceElement = item.querySelector('.cart-item-price');
        const quantityElement = item.querySelector('.cart-item-quantity');
        const price = parseFloat(priceElement.innerText);
        const quantity = parseInt(quantityElement.innerText);

        productsPrice += price * quantity;
    });

    let productsPriceInINR = productsPrice;
    let gst = productsPriceInINR * 0.12;
    let finalPrice = productsPriceInINR + gst;

    document.getElementById('products-price').innerText = productsPriceInINR.toFixed(2);
    document.getElementById('gst').innerText = gst.toFixed(2);
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Add the class for scroll animation
                observer.unobserve(entry.target); // Stop observing once done
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the card is visible

    productCards.forEach(card => observer.observe(card));
});
