/* ==========================================
   1. LOADER LOGIC (Anti-Lag)
   ========================================== */
const loader = document.querySelector('.loader-wrapper');
const hideLoader = () => {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
};
window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 3000); // Safety backup

/* ==========================================
   2. HAMBURGER MENU & NAV
   ========================================== */
const menuToggle = document.getElementById('nav-menu-toggle');
const navLinksContainer = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Isara ang menu kapag nag-click ng link (para sa mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });
}

/* ==========================================
   3. HEADER SCROLL & ACTIVE LINKS
   ========================================== */
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Header background change
    if (window.scrollY > 50) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

/* ==========================================
   4. Formspree  FORM SUBMISSION
   ========================================== */
/* --- FORMSPREE SUBMISSION --- */
/* --- FORMSPREE WITH ERROR HANDLING --- */
/* --- FORMSPREE SUBMISSION (STABLE) --- */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stay on the page

        const btn = this.querySelector('.btn-send');
        const originalContent = btn.innerHTML;

        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                btn.innerHTML = 'Sent! ✅';
                alert("Success! Your message was sent to Jerome.");
                this.reset();
                btn.disabled = false;
                setTimeout(() => { btn.innerHTML = originalContent; }, 3000);
            } else {
                btn.innerHTML = 'Error ❌';
                btn.disabled = false;
                alert("Oops! There was a problem submitting your form.");
                setTimeout(() => { btn.innerHTML = originalContent; }, 3000);
            }
        }).catch(error => {
            btn.innerHTML = 'Error ❌';
            btn.disabled = false;
            alert("Network error. Please check your internet connection.");
        });
    });
}




/* ==========================================
   5. UTILITIES
   ========================================== */
function copyEmail() {
    navigator.clipboard.writeText("jeromemorales.0421@gmail.com").then(() => {
        const icon = document.getElementById('copy-icon-svg');
        if (icon) {
            icon.style.color = '#10b981';
            setTimeout(() => { icon.style.color = ''; }, 2000);
        }
    });
}
