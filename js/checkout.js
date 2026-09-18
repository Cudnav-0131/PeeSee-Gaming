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

function placeOrder() {
    const fullname = document.getElementById("fullname");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const payment = document.querySelector('input[name="payment"]:checked');

    if (!fullname || !phone || !address || !payment) {
        alert("Thiếu thông tin form thanh toán.");
        return;
    }

    const cart = getStorage("gaming_store_cart", []);

    if (cart.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
    }

    if (
        !fullname.value.trim() ||
        !phone.value.trim() ||
        !address.value.trim()
    ) {
        alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.");
        return;
    }

    // Lấy danh sách sản phẩm hiện tại
    const products = getStorage("gaming_store_products", []);

    // Kiểm tra tồn kho trước khi đặt hàng
    for (const item of cart) {
        const product = products.find(
            product => product.id === item.id
        );

        if (!product) {
            alert(`Không tìm thấy sản phẩm: ${item.name}`);
            return;
        }

        const stock = Number(product.stock || 0);

        if (item.quantity > stock) {
            alert(
                `Sản phẩm "${product.name}" chỉ còn ${stock} sản phẩm trong kho.`
            );
            return;
        }
    }

    // Tính tổng tiền
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const orders = getStorage("gaming_store_orders", []);

    const newOrder = {
        id: `ORD-${Date.now()}`,
        customer: {
            name: fullname.value.trim(),
            phone: phone.value.trim(),
            address: address.value.trim()
        },
        paymentMethod: payment.value,
        items: cart,
        total: total,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    // Trừ tồn kho
    cart.forEach(item => {
        const product = products.find(
            product => product.id === item.id
        );

        product.stock -= item.quantity;
    });

    // Lưu đơn hàng
    orders.push(newOrder);
    setStorage("gaming_store_orders", orders);

    // Lưu tồn kho mới
    setStorage("gaming_store_products", products);

    // Xóa giỏ hàng
    setStorage("gaming_store_cart", []);

    alert("Đặt hàng thành công!");

    window.location.href = "../index.html";
}

const placeOrderBtn = document.getElementById("place-order-btn");
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", placeOrder);
}

displayCheckout();