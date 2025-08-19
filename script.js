// JavaScript for interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize slideshow
    showSlide(currentSlide);
    setInterval(nextSlide, slideInterval);
    
    // Header scroll effect
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            logo.classList.add('scrolled');
            navLinks.forEach(link => link.classList.add('scrolled'));
        } else {
            header.classList.remove('scrolled');
            logo.classList.remove('scrolled');
            navLinks.forEach(link => link.classList.remove('scrolled'));
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.visibility = 'visible';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Form submission
    const appointmentForm = document.getElementById('appointmentForm');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server
        // For this example, we'll just show a success message
        alert('Thank you! Your appointment request has been submitted. We will contact you shortly to confirm your booking.');
        
        // Reset the form
        appointmentForm.reset();
    });
});


// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Simple animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.condition-card, .service-item, .pricing-card, .benefit-card, .sport-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const animatedElements = document.querySelectorAll('.condition-card, .service-item, .pricing-card, .benefit-card, .sport-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
});

// Testimonial slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Only run if we have testimonials
    if (testimonialCards.length > 0) {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('testimonial-dots');
        
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        testimonialsContainer.parentNode.insertBefore(dotsContainer, testimonialsContainer.nextSibling);
        
        // Show specific testimonial
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.style.display = 'none');
            testimonialCards[index].style.display = 'block';
            
            // Update active dot
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Auto-rotate testimonials
        function autoRotateTestimonials() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }
        
        // Start auto rotation
        let testimonialInterval = setInterval(autoRotateTestimonials, 5000);
        
        // Pause rotation on hover
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(autoRotateTestimonials, 5000);
        });
        
        // Show first testimonial initially
        showTestimonial(0);
    }
    
    // Transformation before/after slider
    const transformations = document.querySelectorAll('.transformation-image');
    
    transformations.forEach(transformation => {
        const before = transformation.querySelector('.before');
        const after = transformation.querySelector('.after');
        let isDragging = false;
        
        // Create slider control
        const slider = document.createElement('div');
        slider.classList.add('slider');
        transformation.appendChild(slider);
        
        // Set initial position
        slider.style.left = '50%';
        before.style.width = '50%';
        
        // Handle mouse events
        slider.addEventListener('mousedown', startDragging);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', drag);
        
        // Handle touch events
        slider.addEventListener('touchstart', startDragging);
        document.addEventListener('touchend', stopDragging);
        document.addEventListener('touchmove', drag);
        
        function startDragging(e) {
            isDragging = true;
            e.preventDefault();
        }
        
        function stopDragging() {
            isDragging = false;
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const containerRect = transformation.getBoundingClientRect();
            let xPosition = 0;
            
            if (e.type === 'mousemove') {
                xPosition = e.clientX - containerRect.left;
            } else if (e.type === 'touchmove') {
                xPosition = e.touches[0].clientX - containerRect.left;
            }
            
            // Constrain position within container
            xPosition = Math.max(0, Math.min(xPosition, containerRect.width));
            
            // Calculate percentage
            const percentage = (xPosition / containerRect.width) * 100;
            
            // Update UI
            before.style.width = `${percentage}%`;
            slider.style.left = `${percentage}%`;
        }
    });
});


// Initialize Google Map
function initMap() {
    // Nairobi coordinates
    const nairobi = { lat: -1.286389, lng: 36.817223 };
    
    const map = new google.maps.Map(document.getElementById("https://www.google.com/maps/search/map+of+girigiri+courtyard/@-1.2325107,36.8043509,17z?entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D"), {
        zoom: 12,
        center: nairobi,
        styles: [
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            }
        ]
    });
    
    // Add a marker for Nairobi
    new google.maps.Marker({
        position: nairobi,
        map: map,
        title: "Ruth Macha Sports Therapy",
        icon: {
            url: "https://www.google.com/maps/place/SD+Padel+Gigiri+Courtyard/@-1.2330636,36.8026233,17z/data=!3m1!4b1!4m6!3m5!1s0x182f17a946d6dcc3:0x881b43a89207db2!8m2!3d-1.233069!4d36.8072367!16s%2Fg%2F11w902sz9g?entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D"
        }
    });
}

// Form submission handler
document.getElementById("messageForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Simple validation
    if(name && email && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you ${name}! Your message has been sent. We'll contact you at ${email} soon.`);
        
        // Reset form
        document.getElementById("messageForm").reset();
    } else {
        alert("Please fill in all required fields.");
    }
});

// Package booking buttons
document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", function() {
        const packageName = this.parentElement.querySelector("h3").textContent;
        alert(`Thank you for your interest in the ${packageName} package! We'll contact you to confirm your booking.`);
    });
});