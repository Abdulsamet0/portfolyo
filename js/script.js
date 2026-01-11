// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a slight delay managed by CSS transition or simple requestAnimationFrame if we wanted smoothing, 
    // but here we just animate directly for responsiveness.
    // For smoother "trailing" effect:
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Mock Blog Data
const blogPosts = [
    {
        title: "Yapay Zeka ve Etik",
        excerpt: "Otonom sistemlerin karar verme süreçlerinde karşılaşılan etik problemler ve çözüm yaklaşımları.",
        date: "12 Ocak 2026"
    },
    {
        title: "Robotik Sistemlerde Sensör Füzyonu",
        excerpt: "Lidar, Radar ve Kamera verilerinin birleştirilerek daha hassas haritalama yapılması.",
        date: "5 Ocak 2026"
    },
    {
        title: "Endüstri 5.0 ve İnsan Odaklı Üretim",
        excerpt: "Robotların insanlarla işbirliği içinde çalıştığı yeni endüstriyel devrim ne getiriyor?",
        date: "28 Aralık 2025"
    }
];

// Load Blog Posts
const blogContainer = document.getElementById('blog-container');

const loadPosts = () => {
    blogContainer.innerHTML = blogPosts.map(post => `
        <div class="blog-box">
            <div class="blog-img">Blog Görseli</div>
            <div class="blog-content">
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Devamını Oku</a>
            </div>
        </div>
    `).join('');
};

document.addEventListener('DOMContentLoaded', loadPosts);

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Simple Validation check (HTML5 'required' attribute does most work, but we verify here)
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            showStatus('Lütfen tüm zorunlu alanları doldurun.', 'error');
            return;
        }

        formStatus.textContent = 'Gönderiliyor...';
        formStatus.className = 'form-status';

        // To make this work, create a form on formspree.io and replace the URL in index.html
        // For demo purposes, we will simulate a success after 1.5 seconds

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showStatus('Mesajınız başarıyla gönderildi! Teşekkürler.', 'success');
                contactForm.reset();
            } else {
                showStatus('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            }

        } catch (error) {
            showStatus('Bir hata oluştu. İnternet bağlantınızı kontrol edin.', 'error');
        }
    });
}

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
}

