let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
        document.body.appendChild(notification);
    }

    notification.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            gap: 10px;
            background: #22c55e;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-weight: 600;
        ">
            <span style="font-size: 18px; font-weight: bold;">✓</span>
            <span>${message}</span>
        </div>
    `;

    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.display = 'block';

    clearTimeout(notification.timeoutId);
    notification.timeoutId = setTimeout(() => {
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

    saveCart();
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
    saveCart();
    showCart();
}

function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
    showCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    saveCart();
    showCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    showCart();
}

function showCheckoutModal(total) {
    let checkoutOverlay = document.createElement('div');
    checkoutOverlay.id = 'checkoutOverlay';
    checkoutOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    checkoutOverlay.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 90%;
            animation: slideIn 0.3s ease-out;">
            
            <h2 style="
                font-size: 28px;
                color: #0F172A;
                margin: 20px 0;
                font-family: 'Anton', Arial, sans-serif;
            ">Thank You for Your Purchase!</h2>
            
            <p style="
                font-size: 16px;
                color: #666;
                margin: 15px 0;
            ">Your order has been successfully placed.</p>
            
            <div style="
                background: #F0F4F8;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            ">
                <p style="
                    font-size: 14px;
                    color: #666;
                    margin: 5px 0;
                ">Total Amount</p>
                <p style="
                    font-size: 32px;
                    color: blue;
                    font-weight: bold;
                    margin: 5px 0;
                ">₱${total.toLocaleString()}</p>
            </div>
            
            <button onclick="closeCheckoutModal()" style="
                background: blue;
                color: white;
                border: none;
                padding: 14px 40px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s ease;
                margin-top: 20px;
            " onmouseover="this.style.background='darkblue'" onmouseout="this.style.background='blue'">
                Continue Shopping
            </button>
        </div>
    `;

    document.body.appendChild(checkoutOverlay);

    checkoutOverlay.onclick = function(event) {
        if (event.target == checkoutOverlay) {
            closeCheckoutModal();
        }
    };

    let style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

function closeCheckoutModal() {
    let overlay = document.getElementById('checkoutOverlay');
    if (overlay) {
        overlay.remove();
    }
    closeCart();
}

function checkoutCart() {
    let selectedItems = cart.filter(item => item.checked);

    if (selectedItems.length === 0) {
        showNotification('Please select items to checkout.');
        return;
    }

    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
        total += selectedItems[i].price * selectedItems[i].quantity;
    }

    showCheckoutModal(total);
    cart = [];
    saveCart();
    showCart();
}
