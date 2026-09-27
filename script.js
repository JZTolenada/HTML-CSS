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

function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({name: name, price: price, quantity: 1, checked: false});
    }

    showNotification(name + ' added to cart!');
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
        let itemTotal = cart[i].price * cart[i].quantity;
        if (cart[i].checked) {
            total += itemTotal;
        }

        html += `
            <div class="cart-item">
                <input type="checkbox" id="check${i}" ${cart[i].checked ? 'checked' : ''} onchange="toggleItem(${i})">
                <div class="item-info">
                    <label for="check${i}">${cart[i].name}</label>
                    <p>₱${cart[i].price} each</p>
                </div>
                <div class="item-controls">
                    <button onclick="decreaseQty(${i})">-</button>
                    <span>${cart[i].quantity}</span>
                    <button onclick="increaseQty(${i})">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
            </div>
        `;
    }

    cartList.innerHTML = html;
    totalText.innerHTML = total;
}

function toggleItem(index) {
    cart[index].checked = !cart[index].checked;
    showCart();
}

function increaseQty(index) {
    cart[index].quantity += 1;
    showCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    showCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

function checkoutCart() {
    let selectedItems = cart.filter(item => item.checked);

    if (selectedItems.length === 0) {
        alert('Please select items to checkout.');
        return;
    }

    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
        total += selectedItems[i].price * selectedItems[i].quantity;
    }

    alert('Thank you for your purchase!\nTotal: ₱' + total);
    cart = [];
    showCart();
    closeCart();
}
