// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Header and background transitions on scroll
function debounce(func, wait = 20) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }
}));

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections that should animate
document.querySelectorAll('.bio-content, .events-grid, .press-carousel, .recordings-grid, .gallery-grid, .contact-form').forEach((element) => {
    observer.observe(element);
});

// Lightbox functionality
class Lightbox {
    constructor() {
        this.createLightbox();
        this.bindEvents();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="Lightbox Image">
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);
        this.lightbox = lightbox;
        this.lightboxImg = lightbox.querySelector('img');
    }

    bindEvents() {
        // Event items
        document.querySelectorAll('.event-item').forEach(item => {
            item.addEventListener('click', () => this.open(item.querySelector('img').src));
        });

        // Gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => this.open(item.querySelector('img').src));
        });

        // Close button
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());

        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    open(src) {
        this.lightboxImg.src = src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Press Carousel
class PressCarousel {
    constructor() {
        this.videos = [
            { id: 'EBmMEv4ka6I', title: 'Interview 1' },
            { id: '36i0Fasu0qs', title: 'Interview 2' },
            { id: 'J4XL8c80jVM', title: 'Interview 3' }
        ];
        this.articles = [
            {
                title: 'The Conductor',
                source: 'Forbes.kz',
                excerpt: '"Elias has the ability to speak in an engaging and captivating manner; he is persuasive—something new in our field. The quality of his speech and the depth of the information he provides are truly impressive."',
                link: 'https://forbes.kz/articles/dirijer_2'
            },
            {
                title: 'Never a Conformist',
                source: 'Time.kz',
                excerpt: '"Elias performs Mahler\'s vocal cycle "Songs on the Death of Children" with his luxurious bass voice, conducts Shostakovich\'s Chamber Symphony, and remains undeterred by the absence of a full house in the audience. Ilyas chooses pieces that are challenging to perceive, works that have either never been performed in our country or are rarely heard."',
                link: 'https://time.kz/articles/grim/2024/01/30/ni-razu-ne-konformist'
            }
        ];
        this.initializeCarousel();
    }

    initializeCarousel() {
        // Initialize videos
        const videosContainer = document.querySelector('.press-videos');
        this.videos.forEach(video => {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container glass-effect';
            videoContainer.innerHTML = `
                <iframe src="about:blank" data-src="https://www.youtube.com/embed/${video.id}"
                    title="${video.title}" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            videosContainer.appendChild(videoContainer);
        });

        // Initialize articles
        const articlesContainer = document.querySelector('.press-articles');
        this.articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card glass-effect';
            articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <p class="source">${article.source}</p>
                <p class="quote">${article.excerpt}</p>
                <a href="${article.link}" class="read-more" target="_blank" rel="noopener noreferrer">Read Full Article</a>
            `;
            articlesContainer.appendChild(articleCard);
        });
    }
}

// Recordings Section
class RecordingsGrid {
    constructor() {
        this.recordings = [
            { id: 'I3TsO-L4Aw4', title: 'Recording 1' },
            { id: 'V4Wju1mPWIc', title: 'Recording 2' },
            { id: 'nSAvhWV9X8E', title: 'Recording 3' },
            { id: 'h1w-_FDLF4g', title: 'Recording 4' },
            { id: '3l6FWT7EK00', title: 'Recording 5' },
            { id: '2e0_B36PN0Y', title: 'Recording 6' },
            { id: 'H5AdZ7JApwU', title: 'Recording 7' }
        ];
        this.initializeGrid();
    }

    initializeGrid() {
        const recordingsContainer = document.querySelector('.recordings-grid');
        this.recordings.forEach(recording => {
            const recordingItem = document.createElement('div');
            recordingItem.className = 'recording-item glass-effect';
            recordingItem.innerHTML = `
                <iframe src="about:blank" data-src="https://www.youtube.com/embed/${recording.id}"
                    title="${recording.title}" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            recordingsContainer.appendChild(recordingItem);
        });
    }
}

// Events Grid
class EventsGrid {
    constructor() {
        this.events = [
            { src: 'assets/images/events/poster1.JPG', alt: 'Event Poster 1' },
            { src: 'assets/images/events/poster2.JPG', alt: 'Event Poster 2' },
            { src: 'assets/images/events/poster3.JPG', alt: 'Event Poster 3' }
        ];
        this.initializeGrid();
    }

    initializeGrid() {
        const eventsContainer = document.querySelector('.events-grid');
        this.events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item glass-effect';
            eventItem.innerHTML = `
                <img src="${event.src}" alt="${event.alt}" loading="lazy">
            `;
            eventsContainer.appendChild(eventItem);
        });
    }
}

// Gallery Grid
class GalleryGrid {
    constructor() {
        this.images = [
            { src: 'assets/images/gallery/IMG_6853.JPG', alt: 'Gallery Image 1' },
            { src: 'assets/images/gallery/IMG_6734.JPG', alt: 'Gallery Image 2' },
            { src: 'assets/images/gallery/IMG_6851.JPG', alt: 'Gallery Image 3' }
        ];
        this.initializeGrid();
    }

    initializeGrid() {
        const galleryContainer = document.querySelector('.gallery-grid');
        this.images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item glass-effect';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
    new PressCarousel();
    new RecordingsGrid();
    new EventsGrid();
    new GalleryGrid();

    // Lazy load iframes
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src;
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    lazyIframes.forEach(lazyLoad);
}); 