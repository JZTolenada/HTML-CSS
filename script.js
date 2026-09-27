let cart = [];

// Open the cart
function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    showCart();
}

// Close the cart
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Add to cart
function addToCart(name, price) {
    cart.push({name: name, price: price});
    alert(name + ' added to cart!');
}

// Show cart items
function showCart() {
    let cartList = document.getElementById('cartList');
    let total = 0;
    let html = '';
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Cart is empty</p>';
        document.getElementById('total').innerHTML = '0';
        return;
    }
    
    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
        html = html + '<div class="item">' + cart[i].name + ' - ₱' + cart[i].price + ' <button onclick="removeItem(' + i + ')">Remove</button></div>';
    }
    
    cartList.innerHTML = html;
    document.getElementById('total').innerHTML = total;
}

// Remove from cart
function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

// Close modal when click outside
window.onclick = function(event) {
    let modal = document.getElementById('cartModal');
    if (event.target == modal) {
        closeCart();
    }
}
