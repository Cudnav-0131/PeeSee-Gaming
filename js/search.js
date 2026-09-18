console.log("SEARCH JS ĐÃ ĐƯỢC LOAD");


function searchProducts() {
    const searchInput = document.getElementById("search-input");
    const productList = document.getElementById("product-list");

    if (!searchInput || !productList) {
        console.log("Không tìm thấy ô tìm kiếm hoặc danh sách sản phẩm.");
        return;
    }

    const keyword = searchInput.value.trim().toLowerCase();

    const products = getStorage("gaming_store_products", []);

    const filteredProducts = products.filter(product => {
        const name = String(product.name || "").toLowerCase();
        const brand = String(product.brand || "").toLowerCase();
        const category = String(product.category || "").toLowerCase();

        return (
            name.includes(keyword) ||
            brand.includes(keyword) ||
            category.includes(keyword)
        );
    });

    displaySearchResults(filteredProducts);
}


function displaySearchResults(products) {
    const productList = document.getElementById("product-list");

    if (!productList) {
        return;
    }

    if (products.length === 0) {
        productList.innerHTML = `
            <p class="no-result">
                Không tìm thấy sản phẩm phù hợp.
            </p>
        `;
        return;
    }

    productList.innerHTML = products.map(product => {
        const stock = Number(product.stock || 0);

        return `
            <div class="product-card">

                <img src="${product.image || ""}" alt="${product.name || ""}">

                <h3>${product.name || "Sản phẩm"}</h3>

                <p class="product-price">
                    ${Number(product.price || 0).toLocaleString("vi-VN")}đ
                </p>

                <p class="product-rating">
                    ⭐ ${product.rating || 0} | Đã bán ${product.sold || 0}
                </p>

                <p class="product-stock">
                    ${stock <= 0
                ? "Hết hàng"
                : stock <= 5
                    ? `Chỉ còn ${stock} sản phẩm`
                    : "Còn hàng"
            }
                </p>

                <button
                    onclick="addToCart('${product.id}')"
                    ${stock <= 0 ? "disabled" : ""}
                >
                    ${stock <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
                </button>

            </div>
        `;
    }).join("");
}


/* =========================
   XỬ LÝ TÌM KIẾM
========================= */

document.addEventListener("click", function (event) {
    const searchButton = event.target.closest("#search-btn");

    if (searchButton) {
        searchProducts();
    }
});


document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") {
        return;
    }

    if (event.target && event.target.id === "search-input") {
        searchProducts();
    }
});