function displayCheckout() {

    const checkoutList = document.getElementById("checkout-list");
    const checkoutTotal = document.getElementById("checkout-total");

    const cart = getStorage("gaming_store_cart", []);

    if (cart.length === 0) {
        checkoutList.innerHTML = `
            <p>Giỏ hàng đang trống.</p>
        `;

        checkoutTotal.textContent = "0đ";
        return;
    }

    let totalPrice = 0;

    checkoutList.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        totalPrice += itemTotal;

        return `
            <div class="checkout-item">

                <div>
                    <h3>${item.name}</h3>

                    <p>
                        ${item.quantity} x
                        ${item.price.toLocaleString("vi-VN")}đ
                    </p>
                </div>

                <strong>
                    ${itemTotal.toLocaleString("vi-VN")}đ
                </strong>

            </div>
        `;

    }).join("");

    checkoutTotal.textContent =
        totalPrice.toLocaleString("vi-VN") + "đ";
}


displayCheckout();