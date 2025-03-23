// 背景线条动画
const linesContainer = document.getElementById('lines');
const shapesContainer = document.getElementById('shapes');

function createLines() {
    const lineCount = 50;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.left = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 2 + 1}px`;
        line.style.height = `${Math.random() * 100 + 50}%`;
        line.style.animationDuration = `${Math.random() * 10 + 5}s`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        linesContainer.appendChild(line);
    }
}

// 浮动形状动画
function createFloatingShapes() {
    const shapeCount = 20;
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        shape.style.width = `${Math.random() * 100 + 50}px`;
        shape.style.height = shape.style.width;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animationDuration = `${Math.random() * 10 + 5}s`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        shapesContainer.appendChild(shape);
    }
}

// 图片查看器功能
const galleryItems = document.querySelectorAll('.gallery-item');
const imageViewer = document.querySelector('.image-viewer');
const viewerImage = document.querySelector('.viewer-image');
const viewerClose = document.querySelector('.viewer-close');
const viewerPrev = document.querySelector('.viewer-prev');
const viewerNext = document.querySelector('.viewer-next');

let currentImageIndex = 0;

function openImageViewer(index) {
    currentImageIndex = index;
    viewerImage.src = galleryItems[index].dataset.image;
    imageViewer.style.display = 'flex';
    setTimeout(() => {
        imageViewer.style.opacity = '1';
    }, 10);
}

function closeImageViewer() {
    imageViewer.style.opacity = '0';
    setTimeout(() => {
        imageViewer.style.display = 'none';
    }, 300);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    viewerImage.src = galleryItems[currentImageIndex].dataset.image;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    viewerImage.src = galleryItems[currentImageIndex].dataset.image;
}

// 事件监听器
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openImageViewer(index));
});

viewerClose.addEventListener('click', closeImageViewer);
viewerPrev.addEventListener('click', showPrevImage);
viewerNext.addEventListener('click', showNextImage);

// 鼠标跟随光效
const lightSource = document.createElement('div');
lightSource.classList.add('light-source');
document.body.appendChild(lightSource);

document.addEventListener('mousemove', (e) => {
    lightSource.style.left = `${e.clientX}px`;
    lightSource.style.top = `${e.clientY}px`;
});

// 初始化
createLines();
createFloatingShapes();

// 图片hover效果
const profileImages = document.querySelectorAll('.profile-image');
const profileContainer = document.querySelector('.profile-image-container');

profileContainer.addEventListener('mouseenter', () => {
    profileImages.forEach(img => {
        img.style.transition = 'all 0.5s ease-in-out';
    });
});

profileContainer.addEventListener('mouseleave', () => {
    profileImages.forEach(img => {
        img.style.transition = 'none';
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 防止右键菜单
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 防止图片拖动
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// 响应式调整
window.addEventListener('resize', () => {
    linesContainer.innerHTML = '';
    shapesContainer.innerHTML = '';
    createLines();
    createFloatingShapes();
});
