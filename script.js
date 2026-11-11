// AI 爛圖資料庫 (利用向量 SVG 呈現生動的算圖崩壞現象)
const galleryData = [
    {
        id: 1,
        title: "完美的 7 指手勢",
        category: "hands",
        prompt: "Prompt: A close-up high quality photo of a human hand holding a coffee cup...",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#2d3436"/>
            <path d="M 60 160 Q 50 90 70 60 Q 80 50 85 70 Q 95 40 102 70 Q 110 35 118 70 Q 125 40 132 75 Q 140 50 145 80 Q 155 70 155 100 L 140 160 Z" fill="#ffdfba" stroke="#d4a373" stroke-width="3"/>
            <circle cx="90" cy="130" r="15" fill="#6c5ce7"/>
            <text x="50%" y="90%" fill="#fff" font-size="10" text-anchor="middle">多指算圖奇蹟</text>
        </svg>`
    },
    {
        id: 2,
        title: "融化中的優雅駱駝",
        category: "surreal",
        prompt: "Prompt: Realistic camel in the desert, golden hour, 8k resolution, highly detailed...",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#ffeaa7"/>
            <path d="M 30 140 Q 60 80 90 130 Q 120 60 150 130 C 180 180 10 190 30 140 Z" fill="#e17055"/>
            <circle cx="160" cy="90" r="8" fill="#e17055"/>
            <line x1="40" y1="140" x2="35" y2="190" stroke="#e17055" stroke-width="6"/>
            <line x1="50" y1="140" x2="55" y2="185" stroke="#e17055" stroke-width="4"/>
            <line x1="60" y1="140" x2="70" y2="195" stroke="#e17055" stroke-width="5"/>
            <line x1="130" y1="130" x2="140" y2="190" stroke="#e17055" stroke-width="6"/>
            <text x="50%" y="20" fill="#d63031" font-size="12" text-anchor="middle">雙峰融化為三腿</text>
        </svg>`
    },
    {
        id: 3,
        title: "歪斜的微笑微笑再微笑",
        category: "faces",
        prompt: "Prompt: Portrait of a smiling woman, Renaissance painting style, masterpiece...",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#6c5ce7"/>
            <ellipse cx="100" cy="100" rx="50" ry="65" fill="#ffeaa7"/>
            <!-- 歪斜眼睛 -->
            <ellipse cx="80" cy="85" rx="10" ry="5" fill="#fff" transform="rotate(-20 80 85)"/>
            <circle cx="80" cy="85" r="3" fill="#000"/>
            <ellipse cx="120" cy="70" rx="12" ry="18" fill="#fff" transform="rotate(30 120 70)"/>
            <circle cx="123" cy="73" r="4" fill="#000"/>
            <!-- 雙重嘴巴 -->
            <path d="M 75 120 Q 100 150 130 115" stroke="#d63031" stroke-width="4" fill="none"/>
            <path d="M 85 135 Q 105 165 140 130" stroke="#d63031" stroke-width="3" fill="none"/>
        </svg>`
    },
    {
        id: 4,
        title: "無限迴圈貓咪軀干",
        category: "surreal",
        prompt: "Prompt: Cute fluffy cat walking, hyperrealistic, studio lighting...",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#55efc4"/>
            <!-- 超長身體 -->
            <path d="M 30 100 Q 70 50 100 100 T 170 100" fill="none" stroke="#fdcb6e" stroke-width="30" stroke-linecap="round"/>
            <circle cx="30" cy="90" r="18" fill="#fdcb6e"/>
            <!-- 前腳與後腳共6隻 -->
            <line x1="30" y1="105" x2="30" y2="140" stroke="#d63031" stroke-width="4"/>
            <line x1="45" y1="105" x2="45" y2="140" stroke="#d63031" stroke-width="4"/>
            <line x1="90" y1="110" x2="90" y2="145" stroke="#d63031" stroke-width="4"/>
            <line x1="105" y1="110" x2="105" y2="145" stroke="#d63031" stroke-width="4"/>
            <line x1="150" y1="105" x2="150" y2="140" stroke="#d63031" stroke-width="4"/>
            <line x1="165" y1="105" x2="165" y2="140" stroke="#d63031" stroke-width="4"/>
        </svg>`
    },
    {
        id: 5,
        title: "亂碼外星文字招牌",
        category: "surreal",
        prompt: "Prompt: Cyberpunk city street with glowing neon signs saying 'COFFEE'...",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#0984e3"/>
            <rect x="20" y="60" width="160" height="80" rx="10" fill="#2d3436" stroke="#00cec9" stroke-width="4"/>
            <text x="30" y="110" fill="#fd79a8" font-size="22" font-family="monospace" letter-spacing="2">CϾ☲F⟳Ɛξ</text>
        </svg>`
    },
    {
        id: 6,
        title: "打結的籃球選手手臂",
        category: "hands",
        prompt: "Prompt: Professional NBA player dunking a basketball, dynamic action shot...",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#fab1a0"/>
            <path d="M 40 160 C 80 40 120 180 160 50" fill="none" stroke="#e17055" stroke-width="16" stroke-linecap="round"/>
            <circle cx="165" cy="40" r="15" fill="#e84393"/>
        </svg>`
    }
];

// DOM 元素選取
const galleryContainer = document.getElementById('gallery');
const themeToggleBtn = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('image-modal');
const closeModalBtn = document.querySelector('.close-modal');

// 初始化照片牆
function renderGallery(items) {
    galleryContainer.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(item);
        card.innerHTML = `
            <div class="card-image">${item.svg}</div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-prompt">${item.prompt}</p>
                <span class="tag">${getCategoryName(item.category)}</span>
            </div>
        `;
        galleryContainer.appendChild(card);
    });
}

function getCategoryName(category) {
    const map = { hands: '多餘肢體', faces: '崩壞五官', surreal: '超現實幻覺' };
    return map[category] || '未知類別';
}

// 篩選功能
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
            renderGallery(galleryData);
        } else {
            const filtered = galleryData.filter(item => item.category === filter);
            renderGallery(filtered);
        }
    });
});

// 深色模式切換
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggleBtn.innerHTML = newTheme === 'dark' 
        ? '<i class="fa-solid fa-moon"></i>' 
        : '<i class="fa-solid fa-sun"></i>';
});

// Modal 彈窗控制
function openModal(item) {
    document.getElementById('modal-image-container').innerHTML = item.svg;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-prompt').textContent = item.prompt;
    document.getElementById('modal-tag').textContent = getCategoryName(item.category);
    modal.style.display = 'flex';
}

closeModalBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// 初始化執行
renderGallery(galleryData);