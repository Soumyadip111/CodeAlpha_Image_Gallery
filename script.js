// Gallery Images Data
const galleryImages = [
    {
        id: 1,
        src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Mountain Landscape',
        category: 'nature',
        alt: 'Beautiful mountain landscape with cloudy sky'
    },
    {
        id: 2,
        src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Modern Architecture',
        category: 'architecture',
        alt: 'Modern glass building architecture'
    },
    {
        id: 3,
        src: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Portrait Photography',
        category: 'people',
        alt: 'Professional portrait photography'
    },
    {
        id: 4,
        src: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Abstract Colors',
        category: 'abstract',
        alt: 'Abstract colorful artwork'
    },
    {
        id: 5,
        src: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Forest Path',
        category: 'nature',
        alt: 'Serene forest pathway'
    },
    {
        id: 6,
        src: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'City Skyline',
        category: 'architecture',
        alt: 'Urban city skyline at night'
    },
    {
        id: 7,
        src: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Group Portrait',
        category: 'people',
        alt: 'Group of people smiling'
    },
    {
        id: 8,
        src: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Geometric Patterns',
        category: 'abstract',
        alt: 'Abstract geometric patterns'
    },
    {
        id: 9,
        src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Ocean Waves',
        category: 'nature',
        alt: 'Ocean waves crashing on shore'
    },
    {
        id: 10,
        src: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Bridge Architecture',
        category: 'architecture',
        alt: 'Modern bridge architectural design'
    },
    {
        id: 11,
        src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Street Photography',
        category: 'people',
        alt: 'Candid street photography'
    },
    {
        id: 12,
        src: 'https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Light Trails',
        category: 'abstract',
        alt: 'Abstract light trails in motion'
    }
];

// DOM Elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadingSpinner = document.getElementById('loading-spinner');

// State Management
let currentImageIndex = 0;
let filteredImages = [...galleryImages];

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        renderGallery();
        setupEventListeners();
    }, 1500);
});

// Render Gallery Function
function renderGallery() {
    gallery.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        gallery.appendChild(galleryItem);
    });
    
    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Create Gallery Item
function createGalleryItem(image, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.index = index;
    galleryItem.dataset.category = image.category;
    
    galleryItem.innerHTML = `
        <img class="gallery-image" src="${image.src}" alt="${image.alt}" loading="lazy">
        <div class="gallery-overlay">
            <h3 class="overlay-title">${image.title}</h3>
            <p class="overlay-category">${image.category}</p>
        </div>
    `;
    
    galleryItem.addEventListener('click', () => openLightbox(index));
    
    return galleryItem;
}

// Filter Functionality
function filterImages(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Fade out current items
    galleryItems.forEach(item => {
        item.classList.add('fade-out');
    });
    
    setTimeout(() => {
        if (category === 'all') {
            filteredImages = [...galleryImages];
        } else {
            filteredImages = galleryImages.filter(image => image.category === category);
        }
        
        renderGallery();
    }, 300);
}

// Lightbox Functions
function openLightbox(index) {
    currentImageIndex = index;
    const image = filteredImages[currentImageIndex];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    
    // Add fade transition
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = image.title;
        lightboxCategory.textContent = image.category;
        lightboxImage.style.opacity = '1';
    }, 150);
}

// Event Listeners Setup
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter images
            const category = button.dataset.filter;
            filterImages(category);
        });
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Lightbox background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPreviousImage();
            }
        }
    }
}

// Image Loading Optimization
function preloadImages() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

// Initialize preloading
preloadImages();

// Smooth scroll to gallery when filter is clicked
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        gallery.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    });
});

// Lazy loading for better performance
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

// Add loading animation to gallery items
function addLoadingAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}
