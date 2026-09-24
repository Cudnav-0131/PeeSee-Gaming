document.addEventListener("DOMContentLoaded", async function () {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const products = getStorage("gaming_store_products", []);

    const product = products.find(
        item => String(item.id) === String(productId)
    );

    const image = document.getElementById("product-detail-image");
    const brand = document.getElementById("product-detail-brand");
    const name = document.getElementById("product-detail-name");
    const rating = document.getElementById("product-detail-rating");
    const sold = document.getElementById("product-detail-sold");

    const price = document.getElementById("product-detail-price");
    const oldPrice = document.getElementById("product-detail-old-price");
    const discount = document.getElementById("product-detail-discount");
    const stockStatus = document.getElementById("product-detail-stock");

    const quantityInput = document.getElementById("product-detail-quantity");
    const decreaseBtn = document.getElementById("decrease-detail-quantity");
    const increaseBtn = document.getElementById("increase-detail-quantity");

    const addCartBtn = document.getElementById("add-detail-cart-btn");
    const buyNowBtn = document.getElementById("buy-now-btn");

    const description = document.getElementById("product-detail-description");
    const specifications = document.getElementById("product-detail-specifications");


    // ===============================
    // KIỂM TRA SẢN PHẨM
    // ===============================

    if (!product) {

        document.querySelector(".product-detail-container").innerHTML = `
            <div style="text-align:center; padding:80px 20px;">
                <h2>Không tìm thấy sản phẩm</h2>
                <p>Sản phẩm bạn đang xem không tồn tại.</p>
                <a href="../index.html">Quay lại trang chủ</a>
            </div>
        `;

        return;
    }


    // ===============================
    // LẤY ẢNH TỪ INDEXEDDB
    // ===============================

    const imageUrl = await getProductImageUrl(product.image);

    image.src = imageUrl || "../images/logo-peesee.png";
    image.alt = product.name || "Sản phẩm";


    // ===============================
    // THÔNG TIN SẢN PHẨM
    // ===============================

    brand.textContent = product.brand || "";

    name.textContent = product.name || "Sản phẩm";

    rating.textContent = `⭐ ${product.rating || 0}`;

    sold.textContent = `Đã bán ${product.sold || 0}`;


    // ===============================
    // GIÁ
    // ===============================

    const productPrice = Number(product.price ?? 0);

    price.textContent =
        `${productPrice.toLocaleString("vi-VN")}đ`;

    const oldProductPrice = Number(product.oldPrice ?? 0);

    if (oldProductPrice > productPrice) {

        oldPrice.textContent =
            `${oldProductPrice.toLocaleString("vi-VN")}đ`;

        oldPrice.style.display = "inline";

        if (product.discount !== undefined &&
            product.discount !== null &&
            product.discount !== "") {

            discount.textContent = `-${product.discount}%`;
            discount.style.display = "inline-block";

        } else {

            discount.style.display = "none";
        }

    } else {

        oldPrice.style.display = "none";
        discount.style.display = "none";
    }


    // ===============================
    // TỒN KHO
    // ===============================

    const stock = Number(product.stock || 0);

    if (stock <= 0) {

        stockStatus.textContent = "Hết hàng";

        stockStatus.className = "stock-out";

        quantityInput.value = 0;
        quantityInput.disabled = true;

        decreaseBtn.disabled = true;
        increaseBtn.disabled = true;

        addCartBtn.disabled = true;
        buyNowBtn.disabled = true;

    } else if (stock <= 5) {

        stockStatus.textContent = `Chỉ còn ${stock} sản phẩm`;

        stockStatus.className = "stock-low";

        quantityInput.value = 1;

    } else {

        stockStatus.textContent = "Còn hàng";

        stockStatus.className = "stock-available";

        quantityInput.value = 1;
    }


    // ===============================
    // MÔ TẢ
    // ===============================

    description.innerHTML =
        product.description || "Chưa có mô tả sản phẩm.";


    // ===============================
    // THÔNG SỐ
    // ===============================

    if (
        product.specifications &&
        typeof product.specifications === "object"
    ) {

        specifications.innerHTML = "";

        Object.entries(product.specifications).forEach(
            ([key, value]) => {

                specifications.innerHTML += `
                    <div class="specification-row">

                        <span class="spec-key">
                            ${key}
                        </span>

                        <span class="spec-value">
                            ${value}
                        </span>

                    </div>
                `;
            }
        );

    } else {

        specifications.innerHTML = `
            <p>Chưa có thông số kỹ thuật.</p>
        `;
    }


    // ===============================
    // NHẬP SỐ LƯỢNG
    // ===============================

    quantityInput.addEventListener("input", function () {

        let quantity = Number(this.value) || 1;

        if (quantity < 1) {
            quantity = 1;
        }

        if (quantity > stock) {
            quantity = stock;
        }

        this.value = quantity;
    });


    // ===============================
    // THÊM VÀO GIỎ
    // ===============================

    addCartBtn.addEventListener("click", function () {

        const quantity = Number(quantityInput.value) || 1;

        let cart = getStorage("gaming_store_cart", []);

        const existingItem = cart.find(
            item => String(item.id) === String(product.id)
        );


        if (existingItem) {

            const newQuantity =
                Number(existingItem.quantity || 0) + quantity;

            if (newQuantity > stock) {

                alert(
                    `Bạn chỉ có thể mua tối đa ${stock} sản phẩm.`
                );

                return;
            }

            existingItem.quantity = newQuantity;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity
            });
        }


        setStorage("gaming_store_cart", cart);

        alert("Đã thêm sản phẩm vào giỏ hàng!");


        if (typeof updateCartBadge === "function") {

            updateCartBadge();
        }
    });


    // ===============================
    // MUA NGAY
    // ===============================

    buyNowBtn.addEventListener("click", function () {

        const quantity = Number(quantityInput.value) || 1;

        let cart = getStorage("gaming_store_cart", []);

        const existingItem = cart.find(
            item => String(item.id) === String(product.id)
        );


        if (existingItem) {

            const newQuantity =
                Number(existingItem.quantity || 0) + quantity;

            if (newQuantity > stock) {

                alert(
                    `Bạn chỉ có thể mua tối đa ${stock} sản phẩm.`
                );

                return;
            }

            existingItem.quantity = newQuantity;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity
            });
        }


        setStorage("gaming_store_cart", cart);

        window.location.href = "checkout.html";
    });

});
function decreaseDetailQuantity() {

    const quantityInput =
        document.getElementById("product-detail-quantity");

    if (!quantityInput) return;

    let quantity = Number(quantityInput.value) || 1;

    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
}


function increaseDetailQuantity() {

    const quantityInput =
        document.getElementById("product-detail-quantity");

    if (!quantityInput) return;

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId = urlParams.get("id");

    const products =
        getStorage("gaming_store_products", []);

    const product = products.find(
        item => String(item.id) === String(productId)
    );

    if (!product) return;

    const stock = Number(product.stock || 0);

    let quantity = Number(quantityInput.value) || 1;

    if (quantity < stock) {

        quantity++;

        quantityInput.value = quantity;

    } else {

        alert(`Sản phẩm chỉ còn ${stock} cái.`);
    }
}