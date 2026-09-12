const products = [

    // =====================================================
    // 1. LAPTOP
    // =====================================================

    {
        id: "LT01",
        name: "ASUS Vivobook 15",
        category: "laptop",
        brand: "ASUS",
        series: "Vivobook",
        price: 14990000,
        oldPrice: 16990000,
        discount: 12,
        image: "images/products/asus-vivobook-15.jpg",
        rating: 4.7,
        sold: 125,
        stock: 15,
        description: "Laptop văn phòng mỏng nhẹ, phù hợp học tập và làm việc.",
        specifications: {
            cpu: "Intel Core i5-1335U",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "15.6 inch",
            resolution: "Full HD"
        }
    },

    {
        id: "LT02",
        name: "ACER Aspire 5",
        category: "laptop",
        brand: "ACER",
        series: "Aspire",
        price: 13990000,
        oldPrice: 15990000,
        discount: 13,
        image: "images/products/acer-aspire-5.jpg",
        rating: 4.6,
        sold: 98,
        stock: 12,
        description: "Laptop học tập và văn phòng với thiết kế hiện đại.",
        specifications: {
            cpu: "Intel Core i5-12450H",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "15.6 inch",
            resolution: "Full HD"
        }
    },

    {
        id: "LT03",
        name: "DELL Inspiron 15",
        category: "laptop",
        brand: "DELL",
        series: "Inspiron",
        price: 15990000,
        oldPrice: 17990000,
        discount: 11,
        image: "images/products/dell-inspiron-15.jpg",
        rating: 4.8,
        sold: 86,
        stock: 10,
        description: "Laptop Dell bền bỉ dành cho học tập và công việc.",
        specifications: {
            cpu: "Intel Core i5-1335U",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "15.6 inch",
            resolution: "Full HD"
        }
    },

    {
        id: "LT04",
        name: "Lenovo IdeaPad Slim 5",
        category: "laptop",
        brand: "LENOVO",
        series: "IdeaPad",
        price: 16990000,
        oldPrice: 18990000,
        discount: 10,
        image: "images/products/lenovo-ideapad-slim-5.jpg",
        rating: 4.8,
        sold: 74,
        stock: 9,
        description: "Laptop Lenovo mỏng nhẹ với hiệu năng ổn định.",
        specifications: {
            cpu: "AMD Ryzen 7 7730U",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "15.6 inch",
            resolution: "Full HD"
        }
    },


    // =====================================================
    // 2. LAPTOP GAMING
    // =====================================================

    {
        id: "LG01",
        name: "ASUS ROG Strix G16",
        category: "laptop-gaming",
        brand: "ASUS",
        series: "ROG Strix",
        price: 29990000,
        oldPrice: 32990000,
        discount: 9,
        image: "images/products/asus-rog-strix-g16.jpg",
        rating: 4.9,
        sold: 128,
        stock: 10,
        description: "Laptop gaming cao cấp với hiệu năng mạnh mẽ.",
        specifications: {
            cpu: "Intel Core i7-13650HX",
            ram: "16GB DDR5",
            storage: "512GB SSD",
            gpu: "RTX 4060 8GB",
            screen: "16 inch 165Hz"
        }
    },

    {
        id: "LG02",
        name: "Acer Nitro V15",
        category: "laptop-gaming",
        brand: "ACER",
        series: "Nitro",
        price: 18990000,
        oldPrice: 20990000,
        discount: 10,
        image: "images/products/acer-nitro-v15.jpg",
        rating: 4.8,
        sold: 95,
        stock: 15,
        description: "Laptop gaming phổ thông với hiệu năng tốt.",
        specifications: {
            cpu: "Intel Core i5-13420H",
            ram: "16GB DDR5",
            storage: "512GB SSD",
            gpu: "RTX 4050 6GB",
            screen: "15.6 inch 144Hz"
        }
    },

    {
        id: "LG03",
        name: "MSI Katana 15",
        category: "laptop-gaming",
        brand: "MSI",
        series: "Katana",
        price: 24990000,
        oldPrice: 26990000,
        discount: 7,
        image: "images/products/msi-katana-15.jpg",
        rating: 4.7,
        sold: 76,
        stock: 8,
        description: "Laptop gaming MSI với cấu hình mạnh.",
        specifications: {
            cpu: "Intel Core i7-13620H",
            ram: "16GB DDR5",
            storage: "1TB SSD",
            gpu: "RTX 4060 8GB",
            screen: "15.6 inch 144Hz"
        }
    },

    {
        id: "LG04",
        name: "Lenovo LOQ 15",
        category: "laptop-gaming",
        brand: "LENOVO",
        series: "LOQ",
        price: 22990000,
        oldPrice: 24990000,
        discount: 8,
        image: "images/products/lenovo-loq-15.jpg",
        rating: 4.8,
        sold: 64,
        stock: 14,
        description: "Laptop gaming Lenovo cân bằng giữa hiệu năng và giá.",
        specifications: {
            cpu: "Intel Core i5-13450HX",
            ram: "16GB DDR5",
            storage: "512GB SSD",
            gpu: "RTX 4050 6GB",
            screen: "15.6 inch 144Hz"
        }
    },


    // =====================================================
    // 3. PC / PS
    // =====================================================

    {
        id: "PC01",
        name: "PC Gaming GVN A1",
        category: "pc-ps",
        brand: "GVN",
        series: "Gaming",
        price: 25990000,
        oldPrice: 27990000,
        discount: 7,
        image: "images/products/pc-gvn-a1.jpg",
        rating: 4.9,
        sold: 42,
        stock: 6,
        description: "PC gaming hiệu năng cao cho game thủ.",
        specifications: {
            cpu: "Intel Core i5-14400F",
            ram: "16GB DDR5",
            storage: "1TB SSD",
            gpu: "RTX 4060 8GB",
            psu: "650W"
        }
    },

    {
        id: "PC02",
        name: "PC Gaming GVN A2",
        category: "pc-ps",
        brand: "GVN",
        series: "Gaming",
        price: 32990000,
        oldPrice: 35990000,
        discount: 8,
        image: "images/products/pc-gvn-a2.jpg",
        rating: 4.9,
        sold: 31,
        stock: 5,
        description: "PC gaming cao cấp cho gaming và streaming.",
        specifications: {
            cpu: "Intel Core i7-14700F",
            ram: "32GB DDR5",
            storage: "1TB SSD",
            gpu: "RTX 4070",
            psu: "750W"
        }
    },

    {
        id: "PC03",
        name: "PlayStation 5 Slim",
        category: "pc-ps",
        brand: "Sony",
        series: "PlayStation 5",
        price: 12990000,
        oldPrice: 13990000,
        discount: 7,
        image: "images/products/ps5-slim.jpg",
        rating: 4.9,
        sold: 67,
        stock: 8,
        description: "Máy chơi game PlayStation 5 phiên bản Slim.",
        specifications: {
            storage: "1TB SSD",
            resolution: "4K",
            connection: "HDMI / WiFi",
            controller: "DualSense"
        }
    },

    {
        id: "PC04",
        name: "PlayStation 5 Pro",
        category: "pc-ps",
        brand: "Sony",
        series: "PlayStation 5",
        price: 18990000,
        oldPrice: 19990000,
        discount: 5,
        image: "images/products/ps5-pro.jpg",
        rating: 4.9,
        sold: 35,
        stock: 5,
        description: "Console PlayStation cao cấp dành cho gaming 4K.",
        specifications: {
            storage: "2TB SSD",
            resolution: "4K",
            connection: "HDMI / WiFi",
            controller: "DualSense"
        }
    },


    // =====================================================
    // 4. MAIN / CPU / VGA
    // =====================================================

    {
        id: "CP01",
        name: "Intel Core i5-14400F",
        category: "components",
        type: "cpu",
        brand: "Intel",
        series: "Core i5",
        price: 4990000,
        oldPrice: 5290000,
        discount: 6,
        image: "images/products/intel-i5-14400f.jpg",
        rating: 4.9,
        sold: 156,
        stock: 20,
        description: "CPU Intel dành cho PC gaming.",
        specifications: {
            socket: "LGA1700",
            cores: "10 Cores",
            threads: "16 Threads",
            boost: "4.7GHz"
        }
    },

    {
        id: "CP02",
        name: "ASUS TUF Gaming B760",
        category: "components",
        type: "mainboard",
        brand: "ASUS",
        series: "TUF Gaming",
        price: 3990000,
        oldPrice: 4290000,
        discount: 7,
        image: "images/products/asus-b760.jpg",
        rating: 4.8,
        sold: 83,
        stock: 12,
        description: "Mainboard gaming hỗ trợ CPU Intel thế hệ mới.",
        specifications: {
            socket: "LGA1700",
            chipset: "B760",
            ram: "DDR5",
            formFactor: "ATX"
        }
    },

    {
        id: "CP03",
        name: "AMD Ryzen 5 7600",
        category: "components",
        type: "cpu",
        brand: "AMD",
        series: "Ryzen 5",
        price: 4790000,
        oldPrice: 5090000,
        discount: 6,
        image: "images/products/ryzen-5-7600.jpg",
        rating: 4.8,
        sold: 132,
        stock: 18,
        description: "CPU AMD hiệu năng cao cho gaming.",
        specifications: {
            socket: "AM5",
            cores: "6 Cores",
            threads: "12 Threads",
            boost: "5.1GHz"
        }
    },

    {
        id: "CP04",
        name: "ASUS Dual RTX 4060 8GB",
        category: "components",
        type: "vga",
        brand: "ASUS",
        series: "Dual",
        price: 8490000,
        oldPrice: 8990000,
        discount: 6,
        image: "images/products/asus-rtx-4060.jpg",
        rating: 4.9,
        sold: 98,
        stock: 9,
        description: "Card đồ họa RTX 4060 dành cho gaming Full HD.",
        specifications: {
            vram: "8GB GDDR6",
            interface: "PCI Express 4.0",
            boostClock: "2535MHz"
        }
    },


    // =====================================================
    // 5. CASE
    // =====================================================

    {
        id: "CA01",
        name: "XIGMATEK Gaming X",
        category: "case",
        brand: "XIGMATEK",
        series: "Gaming",
        price: 990000,
        oldPrice: 1190000,
        discount: 17,
        image: "images/products/xigmatek-gaming-x.jpg",
        rating: 4.7,
        sold: 68,
        stock: 15,
        description: "Case gaming hiện đại với mặt kính cường lực.",
        specifications: {
            formFactor: "Mid Tower",
            material: "Steel + Tempered Glass",
            fan: "4 Fans"
        }
    },

    {
        id: "CA02",
        name: "NZXT H5 Flow",
        category: "case",
        brand: "NZXT",
        series: "H5",
        price: 2290000,
        oldPrice: 2490000,
        discount: 8,
        image: "images/products/nzxt-h5-flow.jpg",
        rating: 4.9,
        sold: 55,
        stock: 8,
        description: "Case PC cao cấp với thiết kế tối giản.",
        specifications: {
            formFactor: "Mid Tower",
            material: "Steel + Tempered Glass",
            fan: "2 Fans"
        }
    },

    {
        id: "CA03",
        name: "Corsair 4000D Airflow",
        category: "case",
        brand: "Corsair",
        series: "4000D",
        price: 2390000,
        oldPrice: 2690000,
        discount: 11,
        image: "images/products/corsair-4000d.jpg",
        rating: 4.9,
        sold: 73,
        stock: 10,
        description: "Case gaming tối ưu luồng gió.",
        specifications: {
            formFactor: "Mid Tower",
            material: "Steel + Tempered Glass",
            fan: "2 Fans"
        }
    },

    {
        id: "CA04",
        name: "Cooler Master TD500 Mesh",
        category: "case",
        brand: "Cooler Master",
        series: "TD500",
        price: 1990000,
        oldPrice: 2290000,
        discount: 13,
        image: "images/products/cooler-master-td500.jpg",
        rating: 4.8,
        sold: 49,
        stock: 7,
        description: "Case gaming hỗ trợ hệ thống tản nhiệt tốt.",
        specifications: {
            formFactor: "Mid Tower",
            material: "Steel + Tempered Glass",
            fan: "3 Fans"
        }
    },


    // =====================================================
    // 6. LOA / MICRO
    // =====================================================

    {
        id: "LM01",
        name: "Creative Pebble V3",
        category: "speaker-microphone",
        type: "speaker",
        brand: "Creative",
        series: "Pebble",
        price: 990000,
        oldPrice: 1190000,
        discount: 17,
        image: "images/products/creative-pebble-v3.jpg",
        rating: 4.7,
        sold: 115,
        stock: 20,
        description: "Loa máy tính nhỏ gọn dành cho gaming.",
        specifications: {
            connection: "USB-C / Bluetooth",
            power: "8W"
        }
    },

    {
        id: "LM02",
        name: "Razer Leviathan V2",
        category: "speaker-microphone",
        type: "speaker",
        brand: "Razer",
        series: "Leviathan",
        price: 5990000,
        oldPrice: 6490000,
        discount: 8,
        image: "images/products/razer-leviathan-v2.jpg",
        rating: 4.9,
        sold: 42,
        stock: 6,
        description: "Soundbar gaming cao cấp với âm thanh sống động.",
        specifications: {
            connection: "Bluetooth / USB",
            channels: "2.1"
        }
    },

    {
        id: "LM03",
        name: "HyperX SoloCast",
        category: "speaker-microphone",
        type: "microphone",
        brand: "HyperX",
        series: "SoloCast",
        price: 1390000,
        oldPrice: 1590000,
        discount: 13,
        image: "images/products/hyperx-solocast.jpg",
        rating: 4.8,
        sold: 89,
        stock: 14,
        description: "Microphone USB dành cho gaming và streaming.",
        specifications: {
            type: "Condenser",
            connection: "USB",
            pickup: "Cardioid"
        }
    },

    {
        id: "LM04",
        name: "FIFINE AM8",
        category: "speaker-microphone",
        type: "microphone",
        brand: "FIFINE",
        series: "AM",
        price: 1890000,
        oldPrice: 2190000,
        discount: 14,
        image: "images/products/fifine-am8.jpg",
        rating: 4.8,
        sold: 76,
        stock: 12,
        description: "Microphone gaming dành cho livestream và thu âm.",
        specifications: {
            type: "Dynamic",
            connection: "USB / XLR",
            pickup: "Cardioid"
        }
    },


    // =====================================================
    // 7. MÀN HÌNH
    // =====================================================

    {
        id: "MH01",
        name: "ASUS TUF Gaming VG249Q3A",
        category: "monitor",
        brand: "ASUS",
        series: "TUF Gaming",
        price: 4290000,
        oldPrice: 4790000,
        discount: 10,
        image: "images/products/asus-vg249q3a.jpg",
        rating: 4.8,
        sold: 94,
        stock: 11,
        description: "Màn hình gaming 180Hz.",
        specifications: {
            size: "24 inch",
            resolution: "Full HD",
            refreshRate: "180Hz",
            panel: "IPS"
        }
    },

    {
        id: "MH02",
        name: "LG UltraGear 27GS60F",
        category: "monitor",
        brand: "LG",
        series: "UltraGear",
        price: 5990000,
        oldPrice: 6490000,
        discount: 8,
        image: "images/products/lg-ultragear.jpg",
        rating: 4.9,
        sold: 71,
        stock: 8,
        description: "Màn hình gaming 27 inch tốc độ cao.",
        specifications: {
            size: "27 inch",
            resolution: "Full HD",
            refreshRate: "180Hz",
            panel: "IPS"
        }
    },

    {
        id: "MH03",
        name: "Samsung Odyssey G5",
        category: "monitor",
        brand: "Samsung",
        series: "Odyssey",
        price: 7490000,
        oldPrice: 7990000,
        discount: 6,
        image: "images/products/samsung-odyssey-g5.jpg",
        rating: 4.9,
        sold: 62,
        stock: 7,
        description: "Màn hình gaming cong với độ phân giải cao.",
        specifications: {
            size: "27 inch",
            resolution: "2K",
            refreshRate: "165Hz",
            panel: "VA"
        }
    },

    {
        id: "MH04",
        name: "MSI G244F",
        category: "monitor",
        brand: "MSI",
        series: "Gaming",
        price: 4290000,
        oldPrice: 4690000,
        discount: 9,
        image: "images/products/msi-g244f.jpg",
        rating: 4.8,
        sold: 58,
        stock: 9,
        description: "Màn hình gaming IPS tốc độ cao.",
        specifications: {
            size: "24 inch",
            resolution: "Full HD",
            refreshRate: "180Hz",
            panel: "Rapid IPS"
        }
    },


    // =====================================================
    // 8. BÀN PHÍM
    // =====================================================

    {
        id: "BP01",
        name: "Razer BlackWidow V4",
        category: "keyboard",
        brand: "Razer",
        series: "BlackWidow",
        price: 4290000,
        oldPrice: 4790000,
        discount: 10,
        image: "images/products/razer-blackwidow-v4.jpg",
        rating: 4.9,
        sold: 118,
        stock: 13,
        description: "Bàn phím cơ gaming cao cấp.",
        specifications: {
            type: "Mechanical",
            switch: "Green Switch",
            layout: "Fullsize",
            connection: "USB"
        }
    },

    {
        id: "BP02",
        name: "Logitech G Pro X TKL",
        category: "keyboard",
        brand: "Logitech",
        series: "G Pro",
        price: 3990000,
        oldPrice: 4490000,
        discount: 11,
        image: "images/products/logitech-g-pro-x-tkl.jpg",
        rating: 4.8,
        sold: 87,
        stock: 10,
        description: "Bàn phím gaming TKL chuyên nghiệp.",
        specifications: {
            type: "Mechanical",
            switch: "GX",
            layout: "TKL",
            connection: "Wireless"
        }
    },

    {
        id: "BP03",
        name: "Akko 5075B Plus",
        category: "keyboard",
        brand: "Akko",
        series: "5075",
        price: 1990000,
        oldPrice: 2290000,
        discount: 13,
        image: "images/products/akko-5075b.jpg",
        rating: 4.8,
        sold: 143,
        stock: 18,
        description: "Bàn phím cơ layout 75% dành cho gaming.",
        specifications: {
            type: "Mechanical",
            switch: "Akko",
            layout: "75%",
            connection: "Wireless"
        }
    },

    {
        id: "BP04",
        name: "Corsair K70 RGB",
        category: "keyboard",
        brand: "Corsair",
        series: "K70",
        price: 3490000,
        oldPrice: 3990000,
        discount: 13,
        image: "images/products/corsair-k70.jpg",
        rating: 4.8,
        sold: 65,
        stock: 9,
        description: "Bàn phím cơ gaming với hệ thống RGB.",
        specifications: {
            type: "Mechanical",
            switch: "Red Switch",
            layout: "Fullsize",
            connection: "USB"
        }
    },


    // =====================================================
    // 9. CHUỘT / LÓT CHUỘT
    // =====================================================

    {
        id: "CH01",
        name: "Logitech G502 X",
        category: "mouse-mousepad",
        type: "mouse",
        brand: "Logitech",
        series: "G502",
        price: 2990000,
        oldPrice: 3290000,
        discount: 9,
        image: "images/products/logitech-g502-x.jpg",
        rating: 4.9,
        sold: 235,
        stock: 25,
        description: "Chuột gaming với nhiều nút tùy chỉnh.",
        specifications: {
            sensor: "HERO 25K",
            dpi: "25600 DPI",
            connection: "Wired",
            buttons: "13"
        }
    },

    {
        id: "CH02",
        name: "Razer DeathAdder V3",
        category: "mouse-mousepad",
        type: "mouse",
        brand: "Razer",
        series: "DeathAdder",
        price: 2490000,
        oldPrice: 2790000,
        discount: 11,
        image: "images/products/razer-deathadder-v3.jpg",
        rating: 4.9,
        sold: 174,
        stock: 18,
        description: "Chuột gaming công thái học nhẹ.",
        specifications: {
            sensor: "Focus Pro 30K",
            dpi: "30000 DPI",
            connection: "Wired",
            weight: "63g"
        }
    },

    {
        id: "CH03",
        name: "Logitech G640 Mouse Pad",
        category: "mouse-mousepad",
        type: "mousepad",
        brand: "Logitech",
        series: "G640",
        price: 690000,
        oldPrice: 790000,
        discount: 13,
        image: "images/products/logitech-g640.jpg",
        rating: 4.8,
        sold: 210,
        stock: 30,
        description: "Lót chuột gaming kích thước lớn.",
        specifications: {
            size: "400 x 460mm",
            surface: "Soft Cloth",
            thickness: "3mm"
        }
    },

    {
        id: "CH04",
        name: "Razer Gigantus V2",
        category: "mouse-mousepad",
        type: "mousepad",
        brand: "Razer",
        series: "Gigantus",
        price: 590000,
        oldPrice: 690000,
        discount: 14,
        image: "images/products/razer-gigantus-v2.jpg",
        rating: 4.8,
        sold: 156,
        stock: 22,
        description: "Lót chuột gaming bề mặt vải mịn.",
        specifications: {
            size: "450 x 400mm",
            surface: "Cloth",
            thickness: "3mm"
        }
    },


    // =====================================================
    // 10. TAI NGHE
    // =====================================================

    {
        id: "TN01",
        name: "HyperX Cloud III",
        category: "headphone",
        brand: "HyperX",
        series: "Cloud",
        price: 2490000,
        oldPrice: 2790000,
        discount: 11,
        image: "images/products/hyperx-cloud-3.jpg",
        rating: 4.9,
        sold: 198,
        stock: 20,
        description: "Tai nghe gaming với âm thanh rõ ràng.",
        specifications: {
            driver: "53mm",
            connection: "Wired",
            microphone: "Noise Cancelling",
            surround: "DTS Headphone:X"
        }
    },

    {
        id: "TN02",
        name: "Razer BlackShark V2",
        category: "headphone",
        brand: "Razer",
        series: "BlackShark",
        price: 2190000,
        oldPrice: 2490000,
        discount: 12,
        image: "images/products/razer-blackshark-v2.jpg",
        rating: 4.8,
        sold: 143,
        stock: 17,
        description: "Tai nghe gaming nhẹ với microphone rõ tiếng.",
        specifications: {
            driver: "50mm",
            connection: "USB",
            microphone: "HyperClear",
            surround: "7.1"
        }
    },

    {
        id: "TN03",
        name: "Logitech G Pro X 2",
        category: "headphone",
        brand: "Logitech",
        series: "G Pro X",
        price: 4990000,
        oldPrice: 5490000,
        discount: 9,
        image: "images/products/logitech-g-pro-x2.jpg",
        rating: 4.9,
        sold: 84,
        stock: 10,
        description: "Tai nghe gaming không dây cao cấp.",
        specifications: {
            driver: "50mm",
            connection: "Wireless",
            microphone: "Detachable",
            surround: "DTS"
        }
    },

    {
        id: "TN04",
        name: "SteelSeries Arctis Nova 7",
        category: "headphone",
        brand: "SteelSeries",
        series: "Arctis Nova",
        price: 3990000,
        oldPrice: 4490000,
        discount: 11,
        image: "images/products/arctis-nova-7.jpg",
        rating: 4.9,
        sold: 73,
        stock: 8,
        description: "Tai nghe gaming không dây đa nền tảng.",
        specifications: {
            driver: "40mm",
            connection: "Wireless / Bluetooth",
            microphone: "Retractable",
            surround: "360 Spatial Audio"
        }
    },


    // =====================================================
    // 11. GHẾ / BÀN
    // =====================================================

    {
        id: "GB01",
        name: "Ghế Gaming GVN Basic",
        category: "chair-desk",
        type: "chair",
        brand: "GVN",
        series: "Basic",
        price: 2490000,
        oldPrice: 2990000,
        discount: 17,
        image: "images/products/gvn-gaming-chair.jpg",
        rating: 4.7,
        sold: 54,
        stock: 9,
        description: "Ghế gaming hỗ trợ tư thế ngồi thoải mái.",
        specifications: {
            material: "PU Leather",
            recline: "90 - 135 độ",
            load: "120kg"
        }
    },

    {
        id: "GB02",
        name: "Anda Seat Dark Demon",
        category: "chair-desk",
        type: "chair",
        brand: "Anda Seat",
        series: "Dark Demon",
        price: 6990000,
        oldPrice: 7490000,
        discount: 7,
        image: "images/products/anda-seat-dark-demon.jpg",
        rating: 4.9,
        sold: 42,
        stock: 6,
        description: "Ghế gaming cao cấp với thiết kế công thái học.",
        specifications: {
            material: "PVC Leather",
            recline: "90 - 160 độ",
            load: "150kg"
        }
    },

    {
        id: "GB03",
        name: "Bàn Gaming E-DRA LUX",
        category: "chair-desk",
        type: "desk",
        brand: "E-DRA",
        series: "Gaming",
        price: 2490000,
        oldPrice: 2790000,
        discount: 11,
        image: "images/products/edra-gaming-desk.jpg",
        rating: 4.8,
        sold: 63,
        stock: 10,
        description: "Bàn gaming rộng rãi với thiết kế hiện đại.",
        specifications: {
            width: "120cm",
            material: "MDF",
            height: "75cm"
        }
    },

    {
        id: "GB04",
        name: "Bàn nâng hạ FlexiSpot",
        category: "chair-desk",
        type: "desk",
        brand: "FlexiSpot",
        series: "Standing Desk",
        price: 5990000,
        oldPrice: 6490000,
        discount: 8,
        image: "images/products/flexispot-desk.jpg",
        rating: 4.9,
        sold: 38,
        stock: 5,
        description: "Bàn nâng hạ điện phù hợp gaming và làm việc.",
        specifications: {
            width: "140cm",
            material: "MDF",
            height: "72 - 121cm"
        }
    }
];


// =====================================================
// DANH MỤC
// =====================================================

const categories = [
    {
        id: "laptop",
        name: "Laptop",
        code: "LT",
        icon: "💻"
    },

    {
        id: "laptop-gaming",
        name: "Laptop Gaming",
        code: "LG",
        icon: "💻"
    },

    {
        id: "pc-ps",
        name: "PC / PS",
        code: "PC",
        icon: "🖥️"
    },

    {
        id: "components",
        name: "Main, CPU, VGA",
        code: "CP",
        icon: "⚙️"
    },

    {
        id: "case",
        name: "Case",
        code: "CA",
        icon: "🖥️"
    },

    {
        id: "speaker-microphone",
        name: "Loa, Micro",
        code: "LM",
        icon: "🎙️"
    },

    {
        id: "monitor",
        name: "Màn hình",
        code: "MH",
        icon: "🖥️"
    },

    {
        id: "keyboard",
        name: "Bàn phím",
        code: "BP",
        icon: "⌨️"
    },

    {
        id: "mouse-mousepad",
        name: "Chuột, Lót chuột",
        code: "CH",
        icon: "🖱️"
    },

    {
        id: "headphone",
        name: "Tai nghe",
        code: "TN",
        icon: "🎧"
    },

    {
        id: "chair-desk",
        name: "Ghế, Bàn",
        code: "GB",
        icon: "🪑"
    }
];