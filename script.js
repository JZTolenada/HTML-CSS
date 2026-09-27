let cart = [];

function openCart() {
    let modal = document.getElementById('cartModal');
    if (!modal) {
        createCartModal();
        modal = document.getElementById('cartModal');
    }
    modal.style.display = 'block';
    showCart();
}

function closeCart() {
    let modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function createCartModal() {
    let modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-panel">
            <div class="cart-header">
                <h2>Shopping Cart</h2>
                <button class="close-cart" onclick="closeCart()">✕</button>
            </div>
            <div id="cartList" class="cart-items">
                <p>Cart is empty</p>
            </div>
            <div class="cart-footer">
                <div class="cart-total">Total: ₱<span id="total">0</span></div>
                <button class="checkout-btn" onclick="checkoutCart()">Checkout</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    window.onclick = function(event) {
        if (event.target == modal) {
            closeCart();
        }
    };
}

function addToCart(name, price) {
    cart.push({name: name, price: price});
    alert(name + ' added to cart!');
}

function showCart() {
    let cartList = document.getElementById('cartList');
    let totalText = document.getElementById('total');
    let total = 0;
    let html = '';

    if (!cartList || !totalText) return;

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Cart is empty</p>';
        totalText.innerHTML = '0';
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
        html = html + '<div class="cart-item">' + cart[i].name + ' - ₱' + cart[i].price + ' <button onclick="removeItem(' + i + ')">Remove</button></div>';
    }

    cartList.innerHTML = html;
    totalText.innerHTML = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

function checkoutCart() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    alert('Thank you for your purchase!');
    cart = [];
    showCart();
    closeCart();
}
