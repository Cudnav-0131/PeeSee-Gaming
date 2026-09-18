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

            <p class="product-stock">
                ${Number(product.stock) <= 0
            ? "Hết hàng"
            : Number(product.stock) <= 5
                ? `Chỉ còn ${product.stock} sản phẩm`
                : "Còn hàng"
        }
            </p>

            <button
                onclick="addToCart('${product.id}')"
                ${Number(product.stock) <= 0 ? "disabled" : ""}
            >
                ${Number(product.stock) <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
            </button>
        </div>
    `).join("");
}

displayProducts();

function addToCart(productId) {
    const products = getStorage("gaming_store_products", []);
    const cart = getStorage("gaming_store_cart", []);

    const product = products.find(item => item.id === productId);

    if (!product) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    const stock = Number(product.stock || 0);

    if (stock <= 0) {
        alert("Sản phẩm đã hết hàng.");
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    const currentQuantity = existingItem
        ? Number(existingItem.quantity || 0)
        : 0;

    if (currentQuantity >= stock) {
        alert(`Sản phẩm "${product.name}" chỉ còn ${stock} sản phẩm.`);
        return;
    }

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    setStorage("gaming_store_cart", cart);

    alert("Đã thêm sản phẩm vào giỏ hàng!");
}