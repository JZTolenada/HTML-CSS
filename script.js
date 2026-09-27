let cart = [];

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    showCart();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function addToCart(name, price) {
    cart.push({name: name, price: price});
    showCart();
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

window.onclick = function(event) {
    let modal = document.getElementById('cartModal');
    if (event.target == modal) {
        closeCart();
    }
};
