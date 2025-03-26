document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme from local storage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // -------------------------------------
    // Bible Verse Lookup
    // -------------------------------------
    
    const lookupBtn = document.getElementById('lookupBtn');
    const bookSelect = document.getElementById('bookSelect');
    const verseInput = document.getElementById('verseInput');
    const verseResult = document.getElementById('verseResult');
    
    // Sample Bible verses for demonstration
    const bibleVerses = {
        matthew: {
            '28:6': 'He is not here; for He is risen, as He said. Come, see the place where the Lord lay.',
            '28:5': 'But the angel answered and said to the women, "Do not be afraid, for I know that you seek Jesus who was crucified."',
            '28:7': 'And go quickly and tell His disciples that He is risen from the dead, and indeed He is going before you into Galilee; there you will see Him. Behold, I have told you."'
        },
        mark: {
            '16:6': 'But he said to them, "Do not be alarmed. You seek Jesus of Nazareth, who was crucified. He is risen! He is not here. See the place where they laid Him."',
            '16:7': 'But go, tell His disciples—and Peter—that He is going before you into Galilee; there you will see Him, as He said to you."'
        },
        luke: {
            '24:5-6': '"Why do you seek the living among the dead? He is not here, but is risen! Remember how He spoke to you when He was still in Galilee,"',
            '24:7': 'saying, "The Son of Man must be delivered into the hands of sinful men, and be crucified, and the third day rise again."'
        },
        john: {
            '20:8-9': 'Then the other disciple, who came to the tomb first, went in also; and he saw and believed. For as yet they did not know the Scripture, that He must rise again from the dead.',
            '20:27': 'Then He said to Thomas, "Reach your finger here, and look at My hands; and reach your hand here, and put it into My side. Do not be unbelieving, but believing."'
        },
        acts: {
            '1:3': 'to whom He also presented Himself alive after His suffering by many infallible proofs, being seen by them during forty days and speaking of the things pertaining to the kingdom of God.',
            '1:9': 'Now when He had spoken these things, while they watched, He was taken up, and a cloud received Him out of their sight.'
        },
        '1corinthians': {
            '15:4': 'and that He was buried, and that He rose again the third day according to the Scriptures,',
            '15:20': 'But now Christ is risen from the dead, and has become the firstfruits of those who have fallen asleep.'
        }
    };
    
    if (lookupBtn && bookSelect && verseInput && verseResult) {
        lookupBtn.addEventListener('click', function() {
            const book = bookSelect.value;
            const verse = verseInput.value.trim();
            
            if (verse && bibleVerses[book] && bibleVerses[book][verse]) {
                verseResult.innerHTML = `<p><span class="verse-highlight">${bookSelect.options[bookSelect.selectedIndex].text} ${verse}</span>: ${bibleVerses[book][verse]}</p>`;
                
                // Add animation effect
                verseResult.style.animation = 'none';
                setTimeout(() => {
                    verseResult.style.animation = 'fadeIn 0.5s';
                }, 10);
            } else {
                verseResult.innerHTML = `<p>Verse not found. Please check your reference.</p>`;
            }
        });
        
        // Handle Enter key press
        verseInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                lookupBtn.click();
            }
        });
    }
    
    // -------------------------------------
    // Language Selector
    // -------------------------------------
    
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Get saved language or default to English
        const savedLanguage = localStorage.getItem('language') || 'en';
        languageSelect.value = savedLanguage;
        
        languageSelect.addEventListener('change', function() {
            const language = this.value;
            localStorage.setItem('language', language);
            
            // In a real application, you would have translations for each language
            // For this demo, we'll just show an alert
            alert(`Language changed to ${languageSelect.options[languageSelect.selectedIndex].text}. In a complete implementation, the website content would be translated.`);
        });
    }
    
    // -------------------------------------
    // Navigation and UI Controls
    // -------------------------------------
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Animate the theme change
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        });
    }
    
    // Sticky navigation on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.padding = '0.5rem 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = 'none';
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // -------------------------------------
    // Gallery Functionality
    // -------------------------------------
    
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Gallery pagination (placeholder for real pagination)
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Here you would normally load new images
                // This is a simple placeholder
                const pageNumber = this.textContent;
                console.log(`Loading page ${pageNumber}`);
                
                // Simulate loading with animation
                const gallery = document.querySelector('.gallery-container');
                gallery.style.opacity = '0.5';
                
                setTimeout(() => {
                    gallery.style.opacity = '1';
                }, 500);
            });
        });
    }
    
    // Image lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Instead of rotating the card, we'll show a lightbox when clicked
            const image = this.querySelector('img');
            const caption = this.querySelector('.caption').textContent;
            
            openLightbox(image.src, caption);
        });
    });
    
    function openLightbox(imageSrc, caption) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const lightboxImage = document.createElement('img');
        lightboxImage.src = imageSrc;
        lightboxImage.alt = caption;
        
        const lightboxCaption = document.createElement('div');
        lightboxCaption.className = 'lightbox-caption';
        lightboxCaption.textContent = caption;
        
        const closeButton = document.createElement('span');
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;';
        
        // Append elements
        lightboxContent.appendChild(lightboxImage);
        lightboxContent.appendChild(lightboxCaption);
        lightboxContent.appendChild(closeButton);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Prevent body scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxContent.style.transform = 'scale(1)';
        }, 10);
        
        // Add event listeners for closing
        closeButton.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.style.opacity = '0';
            lightboxContent.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // -------------------------------------
    // Timeline Animation and Controls
    // -------------------------------------
    
    // Animate timeline items as they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateOnScroll = function() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.classList.add('appear');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Timeline navigation controls
    const timelinePrev = document.querySelector('.timeline-nav.prev');
    const timelineNext = document.querySelector('.timeline-nav.next');
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (timelinePrev && timelineNext && timelineContainer) {
        let currentPosition = 0;
        
        timelineNext.addEventListener('click', function() {
            if (currentPosition < timelineItems.length - 1) {
                currentPosition++;
                scrollToTimelineItem(currentPosition);
            }
        });
        
        timelinePrev.addEventListener('click', function() {
            if (currentPosition > 0) {
                currentPosition--;
                scrollToTimelineItem(currentPosition);
            }
        });
        
        function scrollToTimelineItem(index) {
            if (timelineItems[index]) {
                const item = timelineItems[index];
                const containerRect = timelineContainer.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();
                
                const scrollTo = itemRect.top + window.pageYOffset - containerRect.top - window.innerHeight / 3;
                
                window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // -------------------------------------
    // Interactive Map
    // -------------------------------------
    
    // Initialize map if Leaflet is available
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([31.7683, 35.2137], 12); // Jerusalem coordinates
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Define locations
        const locations = {
            golgotha: {
                coords: [31.7784, 35.2297],
                title: 'Golgotha - Crucifixion Site',
                description: 'The place where Jesus was crucified, outside the city walls.'
            },
            tomb: {
                coords: [31.7847, 35.2293],
                title: 'Garden Tomb',
                description: 'Where Jesus\' body was laid and where He was resurrected on the third day.'
            },
            emmaus: {
                coords: [31.8381, 35.1032],
                title: 'Road to Emmaus',
                description: 'Jesus appeared to two disciples on this road after His resurrection.'
            },
            upperRoom: {
                coords: [31.7719, 35.2294],
                title: 'Upper Room',
                description: 'Where Jesus appeared to His disciples after resurrection.'
            },
            galilee: {
                coords: [32.8221, 35.5651],
                title: 'Sea of Galilee',
                description: 'Jesus appeared to His disciples here while they were fishing.'
            },
            olives: {
                coords: [31.7788, 35.2425],
                title: 'Mount of Olives - Ascension',
                description: 'The place where Jesus ascended to heaven 40 days after resurrection.'
            }
        };
        
        // Add markers
        const markers = {};
        
        for (const [key, location] of Object.entries(locations)) {
            markers[key] = L.marker(location.coords)
                .bindPopup(`<strong>${location.title}</strong><p>${location.description}</p>`)
                .addTo(map);
        }
        
        // Location list interaction
        const locationItems = document.querySelectorAll('.location-list li');
        
        if (locationItems.length) {
            locationItems.forEach(item => {
                item.addEventListener('click', function() {
                    const location = this.getAttribute('data-location');
                    
                    // Update active state
                    locationItems.forEach(li => li.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Center map on location
                    if (locations[location]) {
                        map.setView(locations[location].coords, 14);
                        markers[location].openPopup();
                    }
                });
            });
        }
    }
    
    // -------------------------------------
    // Video Tabs
    // -------------------------------------
    
    const videoTabs = document.querySelectorAll('.tab-btn');
    const videoPlayers = document.querySelectorAll('.video-player');
    
    if (videoTabs.length && videoPlayers.length) {
        videoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabContent = this.getAttribute('data-tab');
                
                // Update active tab
                videoTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding video
                videoPlayers.forEach(player => {
                    if (player.getAttribute('data-tab-content') === tabContent) {
                        player.classList.add('active');
                    } else {
                        player.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // -------------------------------------
    // Audio Bible Player
    // -------------------------------------
    
    const audioSelect = document.getElementById('audioPassage');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time');
    const audioText = document.getElementById('audioText');
    
    // Sample audio data (in a real application, these would be actual audio files)
    const audioData = {
        matthew: {
            src: 'matthew.mp3',
            text: 'After the Sabbath, at dawn on the first day of the week, Mary Magdalene and the other Mary went to look at the tomb. There was a violent earthquake, for an angel of the Lord came down from heaven and, going to the tomb, rolled back the stone and sat on it...'
        },
        mark: {
            src: 'mark.mp3',
            text: 'When the Sabbath was over, Mary Magdalene, Mary the mother of James, and Salome bought spices so that they might go to anoint Jesus' body. Very early on the first day of the week, just after sunrise, they were on their way to the tomb...'
        },
        luke: {
            src: 'luke.mp3',
            text: 'On the first day of the week, very early in the morning, the women took the spices they had prepared and went to the tomb. They found the stone rolled away from the tomb, but when they entered, they did not find the body of the Lord Jesus...'
        },
        john: {
            src: 'john.mp3',
            text: 'Early on the first day of the week, while it was still dark, Mary Magdalene went to the tomb and saw that the stone had been removed from the entrance. So she came running to Simon Peter and the other disciple, the one Jesus loved...'
        }
    };
    
    if (audioSelect && playBtn) {
        // Update text when selecting a passage
        audioSelect.addEventListener('change', function() {
            const passage = this.value;
            if (audioData[passage]) {
                audioText.textContent = audioData[passage].text;
                // Reset player
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                progressBar.style.width = '0%';
                timeDisplay.textContent = '00:00';
            }
        });
        
        // Play/pause button (simulated)
        let isPlaying = false;
        let progressInterval;
        
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                // Pause
                this.innerHTML = '<i class="fas fa-play"></i>';
                clearInterval(progressInterval);
            } else {
                // Play
                this.innerHTML = '<i class="fas fa-pause"></i>';
                
                // Simulate playback progress
                let progress = 0;
                progressInterval = setInterval(() => {
                    progress += 1;
                    if (progress <= 100) {
                        progressBar.style.width = `${progress}%`;
                        
                        // Update time display (simulated)
                        const minutes = Math.floor(progress * 0.6 / 100);
                        const seconds = Math.floor((progress * 0.6) % 60);
                        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else {
                        clearInterval(progressInterval);
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        isPlaying = false;
                    }
                }, 600);
            }
            
            isPlaying = !isPlaying;
        });
    }
    
    // -------------------------------------
    // CTA Buttons
    // -------------------------------------
    
    const exploreBtn = document.getElementById('exploreBtn');
    const audioGuideBtn = document.getElementById('audioGuideBtn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (audioGuideBtn) {
        audioGuideBtn.addEventListener('click', function() {
            const audioSection = document.querySelector('.audio-bible');
            if (audioSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = audioSection.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20,
                    behavior: 'smooth'
                });
                
                // Auto-play audio when reaching the section
                setTimeout(() => {
                    if (playBtn && !isPlaying) {
                        playBtn.click();
                    }
                }, 1000);
            }
        });
    }
    
    // -------------------------------------
    // VR Experience Button
    // -------------------------------------
    
    const vrButton = document.querySelector('.vr-button');
    
    if (vrButton) {
        vrButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal for VR experience
            const modal = document.createElement('div');
            modal.className = 'vr-modal';
            modal.innerHTML = `
                <div class="vr-modal-content">
                    <span class="vr-close">&times;</span>
                    <h2>VR Experience</h2>
                    <p>The VR experience is loading. Please wait...</p>
                    <div class="vr-loader"></div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.vr-close');
            closeBtn.addEventListener('click', closeModal);
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            function closeModal() {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
            
            // Simulate loading
            setTimeout(() => {
                modal.querySelector('.vr-modal-content').innerHTML = `
                    <span class="vr-close">&times;</span>
                    <h2>VR Experience Prototype</h2>
                    <p>This is a placeholder for the VR experience. In a full implementation, this would connect to a WebXR experience or a 3D viewer.</p>
                    <div class="vr-placeholder">
                        <img src="https://images.unsplash.com/photo-1626379953822-baec19c3accd" alt="VR Experience" style="width: 100%; border-radius: 10px;">
                        <p>VR technology is not available in this demo. Check back later for the full experience.</p>
                    </div>
                `;
                
                const newCloseBtn = modal.querySelector('.vr-close');
                newCloseBtn.addEventListener('click', closeModal);
            }, 2000);
        });
    }
    
    // -------------------------------------
    // Newsletter Form
    // -------------------------------------
    
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing!';
                
                this.innerHTML = '';
                this.appendChild(successMessage);
                
                // In a real application, you would submit this to a server
                console.log('Subscription email:', email);
            }
        });
    }
    
    // -------------------------------------
    // Add CSS for dynamically created elements
    // -------------------------------------
    
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            margin: 0 auto;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            padding: 1rem;
            font-size: 1.2rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .vr-modal {
            position: fixed;
            z-index: 2000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .vr-modal-content {
            background-color: var(--card-bg);
            border-radius: 10px;
            padding: 30px;
            max-width: 80%;
            max-height: 80%;
            overflow: auto;
            position: relative;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
        }
        
        .vr-close {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: var(--text-color);
        }
        
        .vr-loader {
            border: 5px solid #f3f3f3;
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            margin: 30px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .success-message {
            color: #4CAF50;
            text-align: center;
            padding: 10px;
            font-weight: bold;
        }
    `;
    
    document.head.appendChild(style);
}); 