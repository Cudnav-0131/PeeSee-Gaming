function displayCart() {

    const cartList = document.getElementById("cart-list");
    const cart = getStorage("gaming_store_cart", []);

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Giỏ hàng đang trống.</p>";
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

                <!-- Sản phẩm -->
                <div class="cart-product">

                    <img src="../${item.image}" alt="${item.name}">

                    <div class="cart-product-info">
                        <h3>${item.name}</h3>

                        <button onclick="removeFromCart('${item.id}')">
                            Xóa
                        </button>
                    </div>

                </div>


                <!-- Đơn giá -->
                <div class="cart-price">
                    ${item.price.toLocaleString("vi-VN")}đ
                </div>


                <!-- Số lượng -->
                <div class="quantity-control">

                    <button onclick="decreaseQuantity('${item.id}')">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity('${item.id}')">
                        +
                    </button>

                </div>


                <!-- Thành tiền -->
                <div class="cart-item-total">
                    ${itemTotal.toLocaleString("vi-VN")}đ
                </div>

            </div>
        `;

    }).join("");
}

function increaseQuantity(productId) {

    const cart = getStorage("gaming_store_cart", []);

    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += 1;
    }

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

displayCart();