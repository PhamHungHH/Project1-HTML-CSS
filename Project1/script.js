document.addEventListener('DOMContentLoaded', () => {

    // === Selectors ===
    const header = document.getElementById('header');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const yearSpan = document.getElementById('current-year');

    // Project Modals
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    // === Set Current Year in Footer ===
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // === Sticky Header (handled by CSS `position: sticky`) ===
    // You could add JS here if you want effects on scroll, e.g., add a shadow class
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add corresponding .scrolled styles in CSS if using this.

    // === Hamburger Menu Toggle ===
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // === Smooth Scrolling (handled by CSS `scroll-behavior: smooth;`) ===
    // Keep JS version if CSS isn't supported or for more control
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href'); // e.g., "#about"
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset if header is fixed/sticky and overlaps
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    


    // === Dark/Light Mode Toggle ===
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    }

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });


    // === Project Modals ===
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project-id');
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                modal.style.display = 'flex'; // Use 'flex' to utilize align/justify styles
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Close modal if clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Check if click is directly on the overlay
                modal.style.display = 'none';
            }
        });
    });


    // === Contact Form Validation & Submission (Basic) ===
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default browser submission

            // Clear previous status
            formStatus.textContent = '';
            formStatus.className = '';
            emailError.textContent = '';
            let isValid = true;

            // Simple validation example (you might want more robust validation)
            const name = document.getElementById('name').value.trim();
            const email = emailInput.value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '') {
                // You could add error messages next to fields too
                isValid = false;
            }

            // Basic email format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                 emailError.textContent = 'Please enter a valid email address.';
                 isValid = false;
            }

            if (message === '') {
                 isValid = false;
            }


            if (isValid) {
               
                // --- !!! ---
                console.log('Form data:', { name, email, message });

                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.className = 'success';
                contactForm.reset(); // Clear the form fields

                // Hide success message after a few seconds
                setTimeout(() => {
                     formStatus.textContent = '';
                     formStatus.className = '';
                }, 5000);

            } else {
                 formStatus.textContent = 'Please correct the errors above.';
                 formStatus.className = 'error';
            }
        });
    }
    // --- Modal Opening Logic ---
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project-id');
            const modal = document.getElementById(`${projectId}-modal`);

            console.log(`Opening modal for project ID: ${projectId}`); // <-- ADD LOG

            if (modal) {
                modal.style.display = 'flex'; // Show the modal

                // Specific handling for video in Project 2 modal
                if (projectId === 'project2') {
                     console.log("Handling Project 2 video modal."); // <-- ADD LOG
                     const videoIframe = document.getElementById('project2-video-iframe'); // Check ID here
                     if(videoIframe) {
                         console.log("Video iframe element found:", videoIframe); // <-- ADD LOG
                         const videoSrc = videoIframe.dataset.videoSrc;
                         console.log("Video URL from data-video-src:", videoSrc); // <-- ADD LOG

                         if (videoSrc && videoIframe.src !== videoSrc) {
                            console.log("Setting iframe src attribute now."); // <-- ADD LOG
                            videoIframe.src = videoSrc;
                         } else if (!videoSrc) {
                             console.error("ERROR: data-video-src attribute is empty or missing!"); // <-- ADD ERROR LOG
                         }
                     } else {
                         console.error("ERROR: Could not find iframe with id 'project2-video-iframe'"); // <-- ADD ERROR LOG
                     }
                } else {
                    
                    initializeSlider(modal);
                }
            } else {
                console.error(`ERROR: Could not find modal with id '${projectId}-modal'`); // <-- ADD ERROR LOG
            }
        });
    });
}); // End DOMContentLoaded
