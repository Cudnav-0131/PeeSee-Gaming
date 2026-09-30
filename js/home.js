async function displayProducts() {

    const productList =
        document.getElementById("product-list");

    if (!productList) {
        return;
    }

    // Lấy sản phẩm từ LocalStorage
    const products =
        getStorage("gaming_store_products", []);

    if (products.length === 0) {
        productList.innerHTML =
            "<p>Chưa có sản phẩm.</p>";
        return;
    }


    // Lấy URL ảnh từ IndexedDB
    const productCards = await Promise.all(

        products.map(async product => {

            const imageUrl =
                await getProductImageUrl(product.image);


            return `
                <div class="product-card">

                    <img
                        src="${imageUrl}"
                        alt="${product.name}"
                        onclick="openProductDetail('${product.id}')"
                        style="cursor: pointer;"
                    >

                    <h3
                        onclick="openProductDetail('${product.id}')"
                        style="cursor: pointer;"
                    >
                        ${product.name}
                    </h3>

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
                    onclick="event.stopPropagation(); addToCart('${product.id}')"   
                        ${Number(product.stock) <= 0 ? "disabled" : ""}
                    >
                        ${Number(product.stock) <= 0
                    ? "Hết hàng"
                    : "Thêm vào giỏ"
                }
                    </button>

                </div>
            `;
        })
    );


    // Hiển thị tất cả card
    productList.innerHTML =
        productCards.join("");
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

function openProductDetail(productId) {
    window.location.href =
        `pages/product-detail.html?id=${encodeURIComponent(productId)}`;
}