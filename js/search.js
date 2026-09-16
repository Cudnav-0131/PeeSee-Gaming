console.log("SEARCH JS ĐÃ ĐƯỢC LOAD");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function searchProducts() {
    const keyword = searchInput.value.trim().toLowerCase();

    const products = getStorage("gaming_store_products", []);

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword)
        );
    });

    displaySearchResults(filteredProducts);
}


function displaySearchResults(products) {
    const productList = document.getElementById("product-list");

    if (products.length === 0) {
        productList.innerHTML = `
            <p class="no-result">
                Không tìm thấy sản phẩm phù hợp.
            </p>
        `;
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


/* Bấm nút tìm kiếm */

searchBtn.addEventListener("click", searchProducts);


/* Nhấn Enter để tìm kiếm */

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchProducts();
    }
});