document.addEventListener("DOMContentLoaded", () => {
    // 1. CHỨC NĂNG TÌM KIẾM
    const productData = [
        { name: "Khô gà ", price: "70.000đ", img: "../img/khoga.png", link: "../html/product3.html" },
        { name: "Khô heo cháy tỏi", price: "50.000đ", img: "../img/khoheo.png", link: "../html/product1.html" },
        { name: "Mực 1 nắng", price: "450.000đ", img: "../img/sp2.jpg", link: "../html/product2.html" },
        { name: "Mực hấp nước dừa", price: "220.000đ", img: "../img/muchapdua.png", link: "../html/product4.html" },
        { name: "Khô bò đen", price: "280.000đ", img: "../img/khoboden.png", link: "../html/product5.html" },
        { name: "Tôm tẩm sấy", price: "325.000đ", img: "../img/tomkho.png", link: "../html/product6.html" },
        { name: "Dâu khô", price: "345.000đ", img: "../img/daukho.png", link: "../html/product7.html" },
        { name: "Tôm khô", price: "320.000đ", img: "../img/tomsay.png", link: "../html/product8.html" },
        { name: "Khô cá chỉ 1KG", price: "165.000đ", img: "../img/cachi1kg.png", link: "../html/product9.html" },
        { name: "Khô cá chỉ 500GRAM", price: "140.000đ", img: "../img/cachi.png", link: "../html/product10.html" },
        { name: "Khô bò sợi 1KG", price: "174.000đ", img: "../img/khobosoi.png", link: "../html/product11.html" },
        { name: "Khô bò miếng", price: "199.000đ", img: "../img/khobo.png", link: "../html/product12.html" },
        { name: "Mít sấy", price: "50.000đ", img: "../img/mitsay.png", link: "../html/product13.html" },
        { name: "Nho khô", price: "52.000đ", img: "../img/nhokho.png", link: "../html/product14.html" },
        { name: "Chuối sấy", price: "52.000đ", img: "../img/chuoisay.png", link: "../html/product15.html" },
        { name: "Miến khô", price: "50.000đ", img: "../img/mienkho.png", link: "../html/product16.html" },
    ];

    const searchInput = document.getElementById("searchInput");
    const resultBox = document.getElementById("search-results");

    if (searchInput && resultBox) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            resultBox.innerHTML = "";

            if (query.length > 0) {
                const filtered = productData.filter(p => p.name.toLowerCase().includes(query));

                if (filtered.length > 0) {
                    filtered.forEach(p => {
                        const item = document.createElement("a");
                        item.className = "list-group-item list-group-item-action";
                        item.href = p.link;
                        item.innerHTML = `
                            <img src="${p.img}" alt="${p.name}">
                            <div>
                                <div class="fw-bold small">${p.name}</div>
                                <small class="text-danger">${p.price}</small>
                            </div>
                        `;
                        resultBox.appendChild(item);
                    });
                    resultBox.style.display = "block";
                } else {
                    resultBox.innerHTML = `<div class="p-3 text-center text-muted small">Không tìm thấy sản phẩm này...</div>`;
                    resultBox.style.display = "block";
                }
            } else {
                resultBox.style.display = "none";
            }
        });
    }

    // Đóng kết quả khi click chuột ra ngoài vùng tìm kiếm
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.position-relative') && resultBox) {
            resultBox.style.display = "none";
        }
    });

    // 2. CHỨC NĂNG SLIDER ẢNH SẢN PHẨM
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('mainImg');
    let currentImgIndex = 0;

    // Chỉ thực thi nếu có thư viện ảnh trên trang
    if (thumbs.length > 0 && mainImg) {
        // Cập nhật mảng ảnh dựa trên src của các ảnh thumbnail
        const images = Array.from(thumbs).map(img => img.src);
        // Tự động chuyển ảnh mỗi 5 giây
        let autoSlide = setInterval(() => {
            window.nextImg();
        }, 2000);
        // Biến function thành global để thẻ HTML có thể gọi qua thuộc tính onclick=""
        window.changeImg = function(index) {
            currentImgIndex = index;
            mainImg.src = images[index];
            // Đổi viền đỏ cho ảnh đang chọn
            thumbs.forEach(t => t.classList.remove('active'));
            thumbs[index].classList.add('active');
        };

        window.prevImg = function() {
            currentImgIndex = (currentImgIndex === 0) ? images.length - 1 : currentImgIndex - 1;
            window.changeImg(currentImgIndex);
        };

        window.nextImg = function() {
            currentImgIndex = (currentImgIndex === images.length - 1) ? 0 : currentImgIndex + 1;
            window.changeImg(currentImgIndex);
        };
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // 1. TỰ ĐỘNG CHÈN MODAL GIỎ HÀNG
    if (!document.getElementById("cartModal")) {
        const modalHTML = `
        <div class="modal fade" id="cartModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h5 class="modal-title fw-bold">🛒 GIỎ HÀNG CỦA BẠN</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="cartContent"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" onclick="goToCheckout()">Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 2. CẬP NHẬT NAVBAR NẾU ĐÃ ĐĂNG NHẬP
    const navbarNav = document.querySelector(".navbar-nav.ms-auto");
    if (sessionStorage.getItem("isLoggedIn") === "true" && navbarNav) {
        // Xóa Đăng nhập / Đăng ký
        navbarNav.querySelectorAll('a[href*="login.html"], a[href*="register.html"]').forEach(el => el.parentElement.remove());
        
        // Thêm Dropdown Tài khoản
        navbarNav.insertAdjacentHTML('beforeend', `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-warning fw-bold" href="#" data-bs-toggle="dropdown">Tài khoản</a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#" onclick="showCart()">🛒 Giỏ hàng</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn">Đăng xuất</a></li>
                </ul>
            </li>
        `);

        document.getElementById("logoutBtn").addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("isLoggedIn");
            location.reload();
        });
    }
});

// ================= CÁC HÀM XỬ LÝ TOÀN CỤC =================

// 3. THÊM VÀO GIỎ HÀNG (Gắn vào nút mua)
window.handleCartClick = function() {
    const nameEl = document.querySelector('h1');
    const priceEl = document.querySelector('.price-section h2') || document.querySelector('.text-danger.fw-bold'); 
    
    if (!nameEl || !priceEl) return; // Nếu không ở trang sản phẩm thì bỏ qua

    const name = nameEl.innerText;
    const price = parseInt(priceEl.innerText.replace(/\D/g, '')) || 0;
    const img = document.getElementById('mainImg')?.src || "";
    const quantity = parseInt(document.querySelector('input[type="number"]')?.value) || 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.name === name);
    
    if (item) item.quantity += quantity;
    else cart.push({ name, price, img, quantity });

    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
};

// 4. HIỂN THỊ GIỎ HÀNG
window.showCart = function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const content = document.getElementById("cartContent");
    
    if (cart.length === 0) {
        content.innerHTML = "<p class='text-center my-4'>Giỏ hàng trống!</p>";
    } else {
        let totalAll = 0;
        const rows = cart.map((item, index) => {
            const total = item.price * item.quantity;
            totalAll += total;
            return `
            <tr>
                <td><img src="${item.img}" style="width:40px; margin-right:10px"> ${item.name}</td>
                <td>${item.quantity}</td>
                <td class="text-danger fw-bold">${total.toLocaleString()}đ</td>
                <td><button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">X</button></td>
            </tr>`;
        }).join('');

        content.innerHTML = `
        <table class="table align-middle">
            <thead><tr><th>Sản phẩm</th><th>SL</th><th>Thành tiền</th><th>Xóa</th></tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr>
                <td colspan="2" class="fw-bold text-end">TỔNG CỘNG:</td>
                <td colspan="2" class="text-danger fw-bold fs-5">${totalAll.toLocaleString()}đ</td>
            </tr></tfoot>
        </table>`;
    }
    
    // Dùng getOrCreateInstance để tránh lỗi sinh ra nhiều Modal chồng chéo
    bootstrap.Modal.getOrCreateInstance(document.getElementById('cartModal')).show();
};

// 5. XÓA SẢN PHẨM & THANH TOÁN
window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart(); // Render lại giỏ hàng
};

window.goToCheckout = function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length === 0) alert("Giỏ hàng của bạn đang trống!");
    else window.location.href = "checkout.html";
};