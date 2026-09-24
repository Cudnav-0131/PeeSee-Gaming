// =========================
// IMAGE STORAGE - INDEXEDDB
// =========================

const IMAGE_DB_NAME = "peesee_image_db";
const IMAGE_STORE_NAME = "images";
const IMAGE_DB_VERSION = 1;


// =========================
// MỞ DATABASE
// =========================

function openImageDB() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            IMAGE_DB_NAME,
            IMAGE_DB_VERSION
        );


        request.onupgradeneeded = function (event) {

            const db = event.target.result;

            if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {

                db.createObjectStore(
                    IMAGE_STORE_NAME
                );
            }
        };


        request.onsuccess = function () {
            resolve(request.result);
        };


        request.onerror = function () {
            reject(request.error);
        };
    });
}


// =========================
// TẠO ID ẢNH
// =========================

function createImageId() {

    if (window.crypto && crypto.randomUUID) {
        return `IMG-${crypto.randomUUID()}`;
    }

    return `IMG-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;
}


// =========================
// LƯU ẢNH
// =========================

function saveImageToDB(file) {

    return new Promise(async (resolve, reject) => {

        try {

            const db = await openImageDB();

            const imageId = createImageId();

            const transaction =
                db.transaction(
                    IMAGE_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    IMAGE_STORE_NAME
                );

            store.put(file, imageId);


            transaction.oncomplete = function () {

                db.close();

                resolve(imageId);
            };


            transaction.onerror = function () {

                db.close();

                reject(transaction.error);
            };


        } catch (error) {

            reject(error);
        }
    });
}


// =========================
// LẤY ẢNH
// =========================

function getImageFromDB(imageId) {

    return new Promise(async (resolve, reject) => {

        try {

            const db = await openImageDB();

            const transaction =
                db.transaction(
                    IMAGE_STORE_NAME,
                    "readonly"
                );

            const store =
                transaction.objectStore(
                    IMAGE_STORE_NAME
                );

            const request =
                store.get(imageId);


            request.onsuccess = function () {

                db.close();

                resolve(request.result || null);
            };


            request.onerror = function () {

                db.close();

                reject(request.error);
            };


        } catch (error) {

            reject(error);
        }
    });
}


// =========================
// XÓA ẢNH
// =========================

function deleteImageFromDB(imageId) {

    return new Promise(async (resolve, reject) => {

        try {

            const db = await openImageDB();

            const transaction =
                db.transaction(
                    IMAGE_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    IMAGE_STORE_NAME
                );

            store.delete(imageId);


            transaction.oncomplete = function () {

                db.close();

                resolve();
            };


            transaction.onerror = function () {

                db.close();

                reject(transaction.error);
            };


        } catch (error) {

            reject(error);
        }
    });
}
// =========================
// CHUYỂN ẢNH CŨ TỪ LOCALSTORAGE
// SANG INDEXEDDB
// =========================

async function migrateOldProductImages() {

    const products =
        getStorage("gaming_store_products", []);

    if (!products.length) {
        console.log("Không có sản phẩm để chuyển ảnh.");
        return;
    }

    let changed = false;

    for (const product of products) {

        // Không có ảnh
        if (!product.image) {
            continue;
        }

        // Nếu đã là mã ảnh IndexedDB thì bỏ qua
        if (
            typeof product.image === "string" &&
            product.image.startsWith("IMG-")
        ) {
            continue;
        }

        // Chỉ xử lý ảnh Base64
        if (
            typeof product.image === "string" &&
            product.image.startsWith("data:image/")
        ) {

            try {

                // Chuyển Base64 thành Blob
                const response =
                    await fetch(product.image);

                const blob =
                    await response.blob();

                // Lưu Blob vào IndexedDB
                const imageId =
                    await saveImageToDB(blob);

                // Thay Base64 bằng mã ảnh
                product.image =
                    imageId;

                changed = true;

                console.log(
                    `Đã chuyển ảnh sản phẩm: ${product.name}`
                );

            } catch (error) {

                console.error(
                    `Không thể chuyển ảnh: ${product.name}`,
                    error
                );
            }
        }
    }

    // Chỉ ghi lại localStorage nếu có thay đổi
    if (changed) {

        setStorage(
            "gaming_store_products",
            products
        );

        console.log(
            "Đã hoàn tất chuyển ảnh sang IndexedDB."
        );

    } else {

        console.log(
            "Không có ảnh Base64 cần chuyển."
        );
    }
}

// =========================
// TẠO URL ĐỂ HIỂN THỊ ẢNH
// =========================

async function getProductImageUrl(imageValue) {

    // Không có ảnh
    if (!imageValue) {
        return "";
    }

    // Ảnh Base64 cũ
    if (
        typeof imageValue === "string" &&
        imageValue.startsWith("data:image/")
    ) {
        return imageValue;
    }

    // Ảnh là đường dẫn file
    if (
        typeof imageValue === "string" &&
        (
            imageValue.startsWith("../") ||
            imageValue.startsWith("./") ||
            imageValue.startsWith("http://") ||
            imageValue.startsWith("https://") ||
            imageValue.startsWith("/")
        )
    ) {
        return imageValue;
    }

    // Ảnh được lưu trong IndexedDB
    if (
        typeof imageValue === "string" &&
        imageValue.startsWith("IMG-")
    ) {

        try {

            const imageBlob =
                await getImageFromDB(imageValue);

            if (!imageBlob) {
                return "";
            }

            return URL.createObjectURL(imageBlob);

        } catch (error) {

            console.error(
                "Không thể lấy ảnh từ IndexedDB:",
                error
            );

            return "";
        }
    }

    return "";
}