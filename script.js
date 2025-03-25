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

// 天气功能
const weatherContainer = document.querySelector('.weather-container');
const weatherIcon = document.createElement('i');
const temperature = document.createElement('span');
const weatherDescription = document.createElement('span');
const weatherDetails = document.createElement('div');

weatherIcon.classList.add('weather-icon');
temperature.classList.add('temperature');
weatherDescription.classList.add('weather-description');
weatherDetails.classList.add('weather-details');

weatherContainer.append(weatherIcon, temperature, weatherDescription, weatherDetails);

const API_KEY = '463023415be920d6c36a7db2f9d45b64';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// 获取位置
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => {
                    // 区分用户拒绝和其他错误
                    if (error.code === error.PERMISSION_DENIED) {
                        reject(new Error('USER_DENIED'));
                    } else {
                        reject(error);
                    }
                }
            );
        } else {
            reject(new Error('Geolocation is not supported'));
        }
    });
}

// 获取天气数据
async function getWeatherData(location) {
    try {
        let url;
        if (typeof location === 'string') {
            url = `${WEATHER_URL}?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric&lang=zh_cn`;
        } else {
            const { latitude, longitude } = location;
            url = `${WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=zh_cn`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('天气数据获取失败');
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// 获取天气预报数据
async function getForecastData(location) {
    try {
        let url;
        if (typeof location === 'string') {
            url = `${FORECAST_URL}?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric&lang=zh_cn`;
        } else {
            const { latitude, longitude } = location;
            url = `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=zh_cn`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('天气预报数据获取失败');
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
}

// 更新天气显示
function updateWeatherDisplay(data) {
    weatherContainer.innerHTML = `
        <div class="weather-loading">加载中...</div>
    `;

    if (!data) {
        weatherContainer.innerHTML = '<div class="weather-error">无法获取天气信息</div>';
        return;
    }

    const { weather, main, wind, name } = data;
    const iconCode = weather[0].icon;

    weatherContainer.innerHTML = `
        <div class="weather-header">
            <i class="weather-icon wi wi-owm-${iconCode}"></i>
            <span class="temperature">${Math.round(main.temp)}°C</span>
        </div>
        <div class="weather-description">${weather[0].description}</div>
    `;
}

// 初始化天气
async function initWeather() {
    try {
        weatherContainer.innerHTML = '<div class="weather-loading">获取天气中...</div>';
        
        const coords = await getLocation();
        const [weatherData, forecastData] = await Promise.all([
            getWeatherData(coords),
            getForecastData(coords)
        ]);
        
        updateWeatherDisplay(weatherData);
    } catch (error) {
        console.error('Error initializing weather:', error);
        if (error.message === 'USER_DENIED') {
            weatherContainer.innerHTML = '<div class="weather-error">需要位置权限才能获取天气信息</div>';
        } else {
            weatherContainer.innerHTML = '<div class="weather-error">无法获取天气信息</div>';
            setTimeout(initWeather, 3000);
        }
    }
}

// 定时更新天气
function startWeatherUpdates() {
    initWeather();
    setInterval(initWeather, 30 * 60 * 1000); // 每30分钟更新一次
}

// 响应式调整
window.addEventListener('resize', () => {
    linesContainer.innerHTML = '';
    shapesContainer.innerHTML = '';
    createLines();
    createFloatingShapes();
});

// 主题切换功能
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// 检查本地存储的主题偏好
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
}

// 切换主题
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// 初始化主题
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
}

// 初始化天气功能
startWeatherUpdates();

// 温度单位切换功能
function toggleTemperatureUnit() {
    const tempElement = document.querySelector('.temperature');
    if (!tempElement) return;
    
    const currentTemp = tempElement.textContent;
    if (currentTemp.includes('°C')) {
        const celsius = parseFloat(currentTemp);
        const fahrenheit = Math.round((celsius * 9/5) + 32);
        tempElement.textContent = `${fahrenheit}°F`;
    } else {
        const fahrenheit = parseFloat(currentTemp);
        const celsius = Math.round((fahrenheit - 32) * 5/9);
        tempElement.textContent = `${celsius}°C`;
    }
}

// 天气图标映射
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'day-sunny',
        '01n': 'night-clear',
        '02d': 'day-cloudy',
        '02n': 'night-cloudy',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloudy',
        '04n': 'cloudy',
        '09d': 'rain',
        '09n': 'rain',
        '10d': 'day-rain',
        '10n': 'night-rain',
        '11d': 'thunderstorm',
        '11n': 'thunderstorm',
        '13d': 'snow',
        '13n': 'snow',
        '50d': 'fog',
        '50n': 'fog'
    };
    return iconMap[iconCode] || 'day-sunny';
}

// 粒子系统
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// 设置canvas尺寸
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 粒子类
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = `rgba(255, 255, 255, ${this.opacity})`;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 创建粒子数组
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// 鼠标交互粒子
const mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新并绘制所有粒子
    particles.forEach(particle => {
        particle.update();
        particle.draw();

        // 鼠标交互效果
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            particle.x += dx * 0.02;
            particle.y += dy * 0.02;
        }
    });

    requestAnimationFrame(animate);
}

// 初始化
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
animate();
