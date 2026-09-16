function filterByCategory(category) {
    const products = getStorage("gaming_store_products", []);

    const filteredProducts = products.filter(product => {
        return product.category === category;
    });

    displaySearchResults(filteredProducts);
}