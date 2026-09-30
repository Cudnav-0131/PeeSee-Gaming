// ===============================
// CHUYỂN TỪ TRANG CHỦ SANG DANH MỤC
// ===============================

function filterByCategory(category) {
    window.location.href =
        `pages/category.html?category=${encodeURIComponent(category)}`;
}


// ===============================
// KHI TRANG CATEGORY ĐƯỢC MỞ
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (!category) {
        renderCategoryProducts([]);
        return;
    }

    setupCategoryPage(category);
});


// ===============================
// KHỞI TẠO TRANG DANH MỤC
// ===============================

function setupCategoryPage(category) {

    const products = getStorage("gaming_store_products", []);

    let categoryProducts = products.filter(product => {

        return String(product.category || "").toLowerCase() ===
            String(category).toLowerCase();
    });


    // Lưu danh sách gốc để lọc nhiều lần
    window.categoryProducts = categoryProducts;

    updateCategoryTitle(category);

    setupFilterEvents();

    renderCategoryProducts(categoryProducts);
}


// ===============================
// TÊN DANH MỤC
// ===============================

function updateCategoryTitle(category) {

    const categoryTitle =
        document.getElementById("category-title");

    const categoryProductsTitle =
        document.getElementById("category-products-title");

    const categoryNames = {

        "laptop": "Laptop",

        "laptop-gaming": "Laptop Gaming",

        "pc-ps": "PC / PS",

        "components": "Linh kiện",

        "case": "Case",

        "speaker-microphone": "Loa / Micro",

        "monitor": "Màn hình",

        "keyboard": "Bàn phím",

        "mouse-mousepad": "Chuột / Mousepad",

        "headphone": "Tai nghe",

        "chair-desk": "Ghế / Bàn"
    };


    const name =
        categoryNames[category] || category;


    if (categoryTitle) {
        categoryTitle.textContent = name;
    }

    if (categoryProductsTitle) {
        categoryProductsTitle.textContent = name;
    }
}


// ===============================
// ĐỌC THÔNG SỐ SẢN PHẨM
// ===============================

function getSpecificationText(product) {

    if (
        !product ||
        !product.specifications ||
        typeof product.specifications !== "object"
    ) {
        return "";
    }


    return Object.entries(product.specifications)
        .map(([key, value]) => `${key} ${value}`)
        .join(" ")
        .toLowerCase();
}


// ===============================
// LẤY RAM
// ===============================

function getProductRam(product) {
    if (!product || !product.specifications) return 0;

    const ramText = String(product.specifications.ram || "").toLowerCase();

    const match = ramText.match(/\d+/);

    if (match) {
        return Number(match[0]);
    }

    return 0;
}


// ===============================
// LẤY SSD
// ===============================

function getProductSsd(product) {
    if (!product || !product.specifications) return 0;

    const storageText = String(product.specifications.storage || "").toLowerCase();

    // 1TB = 1024GB
    if (storageText.includes("1tb") || storageText.includes("1 tb")) {
        return 1024;
    }

    const match = storageText.match(/\d+/);

    if (match) {
        return Number(match[0]);
    }

    return 0;
}


// ===============================
// LẤY MÀU
// ===============================

function getProductColor(product) {

    if (product.color) {

        return String(product.color).toLowerCase().trim();
    }


    const text = getSpecificationText(product);


    const colors = [
        "đen",
        "trắng",
        "xám"
    ];


    for (const color of colors) {

        if (text.includes(color)) {
            return color;
        }
    }


    return "";
}


// ===============================
// LỌC SẢN PHẨM
// ===============================

function applyCategoryFilters() {

    const products =
        window.categoryProducts || [];


    let filteredProducts =
        [...products];


    // ===============================
    // KHOẢNG GIÁ
    // ===============================

    const selectedPriceRanges =
        Array.from(
            document.querySelectorAll(
                'input[name="price-range"]:checked'
            )
        ).map(input => input.value);


    const priceAll =
        selectedPriceRanges.includes("all");


    if (!priceAll && selectedPriceRanges.length > 0) {

        filteredProducts =
            filteredProducts.filter(product => {

                const price =
                    Number(product.price || 0);


                return selectedPriceRanges.some(range => {

                    const parts = range.split("-");

                    if (parts.length !== 2) {
                        return false;
                    }


                    const min =
                        Number(parts[0]) * 1000000;

                    const max =
                        Number(parts[1]) * 1000000;


                    return price >= min && price <= max;
                });
            });
    }


    // ===============================
    // GIÁ TỰ NHẬP
    // ===============================

    const minPrice =
        Number(
            document.getElementById("min-price")?.value || 0
        );


    const maxPrice =
        Number(
            document.getElementById("max-price")?.value || 0
        );


    if (minPrice > 0 || maxPrice > 0) {

        filteredProducts =
            filteredProducts.filter(product => {

                const price =
                    Number(product.price || 0);


                if (
                    minPrice > 0 &&
                    price < minPrice
                ) {
                    return false;
                }


                if (
                    maxPrice > 0 &&
                    price > maxPrice
                ) {
                    return false;
                }


                return true;
            });
    }


    // ===============================
    // RAM
    // ===============================

    const selectedRam =
        Array.from(
            document.querySelectorAll(
                '.filter-chip[data-filter="ram"].active'
            )
        ).map(button =>
            Number(button.dataset.value)
        );


    if (selectedRam.length > 0) {

        filteredProducts =
            filteredProducts.filter(product => {

                const ram =
                    getProductRam(product);

                return selectedRam.includes(ram);
            });
    }


    // ===============================
    // SSD
    // ===============================

    const selectedSsd =
        Array.from(
            document.querySelectorAll(
                '.filter-chip[data-filter="ssd"].active'
            )
        ).map(button =>
            Number(button.dataset.value)
        );


    if (selectedSsd.length > 0) {

        filteredProducts =
            filteredProducts.filter(product => {

                const ssd =
                    getProductSsd(product);

                return selectedSsd.includes(ssd);
            });
    }


    // ===============================
    // MÀU SẮC
    // ===============================

    const selectedColors =
        Array.from(
            document.querySelectorAll(
                'input[name="color"]:checked'
            )
        ).map(input =>
            input.value.toLowerCase()
        );


    const colorAll =
        selectedColors.includes("all");


    if (!colorAll && selectedColors.length > 0) {

        filteredProducts =
            filteredProducts.filter(product => {

                const color =
                    getProductColor(product);

                return selectedColors.includes(color);
            });
    }


    // ===============================
    // SẮP XẾP
    // ===============================

    const sortValue =
        document.getElementById("category-sort")?.value ||
        "default";


    if (sortValue === "price-asc") {

        filteredProducts.sort(
            (a, b) =>
                Number(a.price || 0) -
                Number(b.price || 0)
        );
    }


    if (sortValue === "price-desc") {

        filteredProducts.sort(
            (a, b) =>
                Number(b.price || 0) -
                Number(a.price || 0)
        );
    }


    if (sortValue === "name-asc") {

        filteredProducts.sort(
            (a, b) =>
                String(a.name || "").localeCompare(
                    String(b.name || ""),
                    "vi"
                )
        );
    }


    renderCategoryProducts(filteredProducts);
}


// ===============================
// SỰ KIỆN BỘ LỌC
// ===============================

function setupFilterEvents() {

    // ===============================
    // KHOẢNG GIÁ
    // ===============================

    const priceCheckboxes =
        document.querySelectorAll(
            'input[name="price-range"]'
        );


    priceCheckboxes.forEach(input => {

        input.addEventListener("change", function () {

            if (this.value === "all" && this.checked) {

                priceCheckboxes.forEach(other => {

                    if (other !== this) {
                        other.checked = false;
                    }
                });
            }


            if (
                this.value !== "all" &&
                this.checked
            ) {

                const all =
                    document.querySelector(
                        'input[name="price-range"][value="all"]'
                    );

                if (all) {
                    all.checked = false;
                }
            }


            applyCategoryFilters();
        });
    });


    // ===============================
    // GIÁ TỰ NHẬP
    // ===============================

    const minPrice =
        document.getElementById("min-price");

    const maxPrice =
        document.getElementById("max-price");


    if (minPrice) {

        minPrice.addEventListener(
            "input",
            applyCategoryFilters
        );
    }


    if (maxPrice) {

        maxPrice.addEventListener(
            "input",
            applyCategoryFilters
        );
    }


    // ===============================
    // RAM / SSD
    // ===============================

    const filterChips =
        document.querySelectorAll(".filter-chip");


    filterChips.forEach(button => {

        button.addEventListener("click", function () {

            this.classList.toggle("active");

            applyCategoryFilters();
        });
    });


    // ===============================
    // MÀU SẮC
    // ===============================

    const colorCheckboxes =
        document.querySelectorAll(
            'input[name="color"]'
        );


    colorCheckboxes.forEach(input => {

        input.addEventListener("change", function () {

            if (
                this.value === "all" &&
                this.checked
            ) {

                colorCheckboxes.forEach(other => {

                    if (other !== this) {
                        other.checked = false;
                    }
                });
            }


            if (
                this.value !== "all" &&
                this.checked
            ) {

                const all =
                    document.querySelector(
                        'input[name="color"][value="all"]'
                    );

                if (all) {
                    all.checked = false;
                }
            }


            applyCategoryFilters();
        });
    });


    // ===============================
    // SẮP XẾP
    // ===============================

    const sort =
        document.getElementById("category-sort");


    if (sort) {

        sort.addEventListener(
            "change",
            applyCategoryFilters
        );
    }


    // ===============================
    // ĐÓNG / MỞ BỘ LỌC
    // ===============================

    const toggleButtons =
        document.querySelectorAll(".filter-toggle");


    toggleButtons.forEach(button => {

        button.addEventListener("click", function () {

            const section =
                this.closest(".filter-section");

            if (!section) return;


            section.classList.toggle("collapsed");


            this.textContent =
                section.classList.contains("collapsed")
                    ? "⌄"
                    : "⌃";
        });
    });
}


// ===============================
// HIỂN THỊ SẢN PHẨM
// ===============================

async function renderCategoryProducts(products) {

    const productList =
        document.getElementById(
            "category-product-list"
        );


    const noResult =
        document.getElementById(
            "category-no-result"
        );


    const categoryCount =
        document.getElementById(
            "category-count"
        );


    if (!productList) return;


    if (!products || products.length === 0) {

        productList.innerHTML = "";

        if (noResult) {
            noResult.classList.remove("hidden");
        }

        if (categoryCount) {
            categoryCount.textContent =
                "Không có sản phẩm phù hợp";
        }

        return;
    }


    if (noResult) {
        noResult.classList.add("hidden");
    }


    if (categoryCount) {

        categoryCount.textContent =
            `Hiển thị ${products.length} sản phẩm`;
    }


    const productCards =
        await Promise.all(

            products.map(
                async product => {

                    const imageUrl =
                        await getProductImageUrl(
                            product.image
                        );


                    const price =
                        Number(product.price || 0);


                    const oldPrice =
                        Number(product.oldPrice || 0);


                    const stock =
                        Number(product.stock || 0);


                    let stockText =
                        "Còn hàng";


                    let stockClass =
                        "category-stock-available";


                    if (stock <= 0) {

                        stockText =
                            "Hết hàng";

                        stockClass =
                            "category-stock-out";
                    }

                    else if (stock <= 5) {

                        stockText =
                            `Chỉ còn ${stock} sản phẩm`;

                        stockClass =
                            "category-stock-low";
                    }


                    const oldPriceHtml =
                        oldPrice > price
                            ? `
                                <span class="category-product-old-price">
                                    ${oldPrice.toLocaleString("vi-VN")}đ
                                </span>
                              `
                            : "";


                    return `
                        <div class="category-product-card">

                            <img
                                src="${imageUrl || "../images/logo-peesee.png"}"
                                alt="${product.name || "Sản phẩm"}"
                                onclick="openProductDetail('${product.id}')"
                            >

                            <h3
                                onclick="openProductDetail('${product.id}')"
                            >
                                ${product.name || "Sản phẩm"}
                            </h3>


                            <p class="category-product-price">
                                ${price.toLocaleString("vi-VN")}đ
                                ${oldPriceHtml}
                            </p>


                            <p class="category-product-rating">
                                ⭐ ${product.rating || 0}
                                |
                                Đã bán ${product.sold || 0}
                            </p>


                            <p class="category-product-stock ${stockClass}">
                                ${stockText}
                            </p>


                            <button
                                type="button"
                                onclick="addCategoryProductToCart('${product.id}')"
                                ${stock <= 0 ? "disabled" : ""}
                            >
                                ${stock <= 0
                            ? "Hết hàng"
                            : "Thêm vào giỏ"
                        }
                            </button>

                        </div>
                    `;
                }
            )
        );


    productList.innerHTML =
        productCards.join("");
}


// ===============================
// MỞ CHI TIẾT SẢN PHẨM
// ===============================

function openProductDetail(productId) {
    const isPagesFolder = window.location.pathname.includes("/pages/");

    const detailPage = isPagesFolder
        ? "product-detail.html"
        : "pages/product-detail.html";

    window.location.href =
        `${detailPage}?id=${encodeURIComponent(productId)}`;
}


// ===============================
// THÊM VÀO GIỎ HÀNG
// ===============================

function addCategoryProductToCart(productId) {

    const products =
        getStorage(
            "gaming_store_products",
            []
        );


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {

        alert("Không tìm thấy sản phẩm.");

        return;
    }


    const stock =
        Number(product.stock || 0);


    if (stock <= 0) {

        alert("Sản phẩm đã hết hàng.");

        return;
    }


    let cart =
        getStorage(
            "gaming_store_cart",
            []
        );


    const existingItem =
        cart.find(
            item =>
                String(item.id) ===
                String(product.id)
        );


    if (existingItem) {

        const newQuantity =
            Number(existingItem.quantity || 0) + 1;


        if (newQuantity > stock) {

            alert(
                `Bạn chỉ có thể mua tối đa ${stock} sản phẩm.`
            );

            return;
        }


        existingItem.quantity =
            newQuantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price || 0),

            image: product.image,

            quantity: 1
        });
    }


    setStorage(
        "gaming_store_cart",
        cart
    );


    if (
        typeof updateCartBadge ===
        "function"
    ) {

        updateCartBadge();
    }


    alert("Đã thêm sản phẩm vào giỏ hàng!");
}