function displayProducts() {
    const productList = document.getElementById("product-list");

    // Lấy sản phẩm từ LocalStorage
    const products = getStorage("gaming_store_products", []);

    if (products.length === 0) {
        productList.innerHTML = "<p>Chưa có sản phẩm.</p>";
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="product-price">
                ${product.price.toLocaleString("vi-VN")}đ
            </p>

            <p class="product-rating">
                ⭐ ${product.rating} | Đã bán ${product.sold}
            </p>

            <button onclick="addToCart('${product.id}')">
                Thêm vào giỏ
            </button>
        </div>
    `).join("");
}

displayProducts();