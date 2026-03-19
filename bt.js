document.addEventListener("DOMContentLoaded", () => {
    // 1. DATA & INITIALIZATION
    const productData = [
        { name: "Khô gà đè tem loại đặc biệt", price: "150.000đ", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMiv6xJA3Ew6rJm1UIa9Qg3nm75lPo72rpg&s" },
        { name: "Khô gà lá chanh", price: "120.000đ", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT62q4YwpDs-Mko59v5hP7Fir3pRKxYtFXm0Q&s" },
        { name: "Khô bò sợi cay", price: "180.000đ", img: "https://via.placeholder.com/60" },
        { name: "Mực hấp nước dừa", price: "220.000đ", img: "https://via.placeholder.com/60" }
    ];

    const mainImg = document.getElementById("mainImg");
    const thumbs = document.querySelectorAll(".thumb");
    const images = Array.from(thumbs).map(img => img.src);
    let currentIndex = 0;

    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));

    // 2. GALLERY LOGIC
    const updateGallery = (idx) => {
        currentIndex = (idx + images.length) % images.length;
        mainImg.src = images[currentIndex];
        thumbs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));
    };

    window.prevImg = () => updateGallery(currentIndex - 1);
    window.nextImg = () => updateGallery(currentIndex + 1);
    thumbs.forEach((t, i) => t.onclick = () => updateGallery(i));

    // 3. UNIVERSAL SEARCH LOGIC
    const setupSearch = (inputEl, resultEl) => {
        if (!inputEl) return;
        inputEl.oninput = () => {
            const val = inputEl.value.trim().toLowerCase();
            resultEl.innerHTML = "";
            if (!val) { resultEl.style.display = "none"; return; }

            const filtered = productData.filter(p => p.name.toLowerCase().includes(val));
            if (filtered.length > 0) {
                filtered.forEach(p => {
                    const item = document.createElement("a");
                    item.className = "list-group-item list-group-item-action border-0";
                    item.innerHTML = `<img src="${p.img}"> <div><div class="small fw-bold">${p.name}</div><small class="text-danger">${p.price}</small></div>`;
                    resultEl.appendChild(item);
                });
            } else {
                resultEl.innerHTML = `<div class="p-3 text-center text-muted small">Không có sản phẩm này...</div>`;
            }
            resultEl.style.display = "block";
        };
    };

    setupSearch(document.getElementById("searchInput"), document.getElementById("search-results"));
    setupSearch(document.getElementById("mobileSearchInput"), document.getElementById("mobile-search-results"));

    // 4. HANDLERS
    window.toggleMobileSearch = () => {
        const box = document.getElementById("mobileSearchBox");
        const isOpen = box.style.display === "block";
        box.style.display = isOpen ? "none" : "block";
        if (!isOpen) document.getElementById("mobileSearchInput").focus();
    };

    window.handleAccountClick = () => accountModal.show();

    let clickCount = 0;
    let lastClick = 0;
    window.handleCartClick = () => {
        const now = Date.now();
        if (now - lastClick > 1500) clickCount = 0;
        clickCount++;
        lastClick = now;

        if (clickCount >= 2) {
            myModal.show();
            clickCount = 0;
        } else {
            alert("Vui lòng đăng nhập để dùng đầy đủ tính năng!");
        }
    };

    // Close results when clicking outside
    document.onclick = (e) => {
        if (!e.target.closest('.search-box') && !e.target.closest('#mobileSearchBox')) {
            document.getElementById("search-results").style.display = "none";
            document.getElementById("mobile-search-results").style.display = "none";
        }
    };
});