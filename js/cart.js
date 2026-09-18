function syncCartBadge() {
    const cart = getStorage("gaming_store_cart", []);
    const totalQuantity = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const cartBadge = document.querySelector(".cart-count");

    if (cartBadge) {
        cartBadge.textContent = totalQuantity;
    }

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.disabled = totalQuantity === 0;
        checkoutBtn.style.opacity = totalQuantity === 0 ? "0.6" : "1";
        checkoutBtn.style.cursor = totalQuantity === 0 ? "not-allowed" : "pointer";
    }
}

function displayCart() {

    const cartList = document.getElementById("cart-list");

    let cart = getStorage("gaming_store_cart", []);
    const products = getStorage("gaming_store_products", []);

    cart.forEach(item => {
        const product = products.find(product => product.id === item.id);

        if (!product) {
            item.quantity = 0;
            return;
        }

        const stock = Number(product.stock || 0);

        if (item.quantity > stock) {
            item.quantity = stock;
        }
    });

    cart = cart.filter(item => item.quantity > 0);

    setStorage("gaming_store_cart", cart);

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Giỏ hàng đang trống.</p>";

        document.getElementById("subtotal").textContent = "0đ";
        document.getElementById("order-total").textContent = "0đ";

        syncCartBadge();
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("subtotal").textContent =
        totalPrice.toLocaleString("vi-VN") + "đ";

    document.getElementById("order-total").textContent =
        totalPrice.toLocaleString("vi-VN") + "đ";

    cartList.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        return `
            <div class="cart-item">

                <div class="cart-product">
                    <img src="../${item.image}" alt="${item.name}">

                    <div class="cart-product-info">
                        <h3>${item.name}</h3>

                        <button onclick="removeFromCart('${item.id}')">
                            Xóa
                        </button>
                    </div>
                </div>

                <div class="cart-price">
                    ${item.price.toLocaleString("vi-VN")}đ
                </div>

                <div class="quantity-control">
                    <button onclick="decreaseQuantity('${item.id}')">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity('${item.id}')">
                        +
                    </button>
                </div>

                <div class="cart-item-total">
                    ${itemTotal.toLocaleString("vi-VN")}đ
                </div>

            </div>
        `;

    }).join("");

    syncCartBadge();
}

function increaseQuantity(productId) {
    const cart = getStorage("gaming_store_cart", []);
    const products = getStorage("gaming_store_products", []);

    const item = cart.find(item => item.id === productId);
    const product = products.find(product => product.id === productId);

    if (!item || !product) {
        return;
    }

    const stock = Number(product.stock || 0);

    if (item.quantity >= stock) {
        alert(`Sản phẩm "${product.name}" chỉ còn ${stock} sản phẩm.`);
        return;
    }

    item.quantity += 1;

    setStorage("gaming_store_cart", cart);
    displayCart();
}


function decreaseQuantity(productId) {

    const cart = getStorage("gaming_store_cart", []);

    const item = cart.find(item => item.id === productId);

    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        }
    }

    setStorage("gaming_store_cart", cart);
    displayCart();
}


function removeFromCart(productId) {

    let cart = getStorage("gaming_store_cart", []);

    cart = cart.filter(item => item.id !== productId);

    setStorage("gaming_store_cart", cart);
    displayCart();
}

const checkoutButton = document.querySelector(".checkout-btn");
if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
        const cart = getStorage("gaming_store_cart", []);

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
            return;
        }

        window.location.href = "checkout.html";
    });
}

displayCart();