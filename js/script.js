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


// Language handling
const langBtn = document.getElementById('lang-btn');
let currentLang = localStorage.getItem('lang') || 'tr';

const translations = {
    tr: {
        nav_home: 'Ana Sayfa',
        nav_about: 'Hakkımda',
        nav_projects: 'Projelerim',
        nav_blog: 'Blog',
        nav_contact: 'İletişim',
        btn_talk: 'Konuşalım',
        hero_hi: 'Merhaba, Ben',
        hero_desc: 'Gebze Teknik Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. Kontrol sistemleri, robotik ve yapay zeka alanlarında kendimi geliştiriyor ve projeler üretiyorum.',
        btn_read: 'Yazılarımı Oku',
        about_title: 'Hakkımda <span class=\'highlight\'>Ben</span>',
        about_desc: '2025 yılında Gebze Teknik Üniversitesi Bilgisayar Mühendisliği bölümünde eğitimime başladım. Teknolojiye olan tutkum beni özellikle robotik sistemler, otonom kontrol ve yapay zeka alanlarına yöneltti. Teorik bilgilerimi pratik projelerle destekleyerek geleceğin mühendislik çözümlerine katkıda bulunmayı hedefliyorum.',
        skill_ai: 'Yapay Zeka',
        skill_robotics: 'Robotik',
        skill_control: 'Kontrol Sistemleri',
        projects_title: 'Örnek <span class=\'highlight\'>Projelerim</span>',
        proj_1_title: 'Çizgi İzleyen Robot',
        proj_1_desc: 'PID kontrol algoritması kullanarak parkuru en kısa sürede tamamlayan otonom robot projesi.',
        proj_2_title: 'Görüntü İşleme ile Nesne Takibi',
        proj_2_desc: 'OpenCV ve Python kullanarak gerçek zamanlı renk ve şekil algılama sistemi.',
        proj_3_title: 'IoT Akıllı Ev Sistemi',
        proj_3_desc: 'NodeMCU ve mobil uygulama üzerinden kontrol edilebilen sıcaklık ve ışık otomasyonu.',
        btn_view: 'İncele',
        blog_title: 'Son <span class=\'highlight\'>Yazılar</span>',
        contact_title: 'İletişim <span class=\'highlight\'>Kur</span>',
        ph_name: 'Adınız Soyadınız',
        ph_email: 'E-posta Adresiniz',
        ph_phone: 'Telefon',
        ph_subject: 'Konu',
        ph_message: 'Mesajınız',
        btn_send: 'Mesaj Gönder'
    },
    en: {
        nav_home: 'Home',
        nav_about: 'About',
        nav_projects: 'Projects',
        nav_blog: 'Blog',
        nav_contact: 'Contact',
        btn_talk: 'Let\'s Talk',
        hero_hi: 'Hello, I\'m',
        hero_desc: 'I am a Computer Engineering student at Gebze Technical University. I am developing myself in control systems, robotics, and artificial intelligence, and creating projects.',
        btn_read: 'Read My Articles',
        about_title: 'About <span class=\'highlight\'>Me</span>',
        about_desc: 'I started my education in the Computer Engineering department at Gebze Technical University in 2025. My passion for technology directed me especially towards robotics systems, autonomous control, and artificial intelligence. I aim to contribute to future engineering solutions by supporting my theoretical knowledge with practical projects.',
        skill_ai: 'Artificial Intelligence',
        skill_robotics: 'Robotics',
        skill_control: 'Control Systems',
        projects_title: 'Sample <span class=\'highlight\'>Projects</span>',
        proj_1_title: 'Line Follower Robot',
        proj_1_desc: 'Autonomous robot project completing the track in the shortest time using PID control algorithm.',
        proj_2_title: 'Object Tracking with Image Processing',
        proj_2_desc: 'Real-time color and shape detection system using OpenCV and Python.',
        proj_3_title: 'IoT Smart Home System',
        proj_3_desc: 'Temperature and light automation controllable via NodeMCU and mobile app.',
        btn_view: 'View',
        blog_title: 'Latest <span class=\'highlight\'>Articles</span>',
        contact_title: 'Contact <span class=\'highlight\'>Me</span>',
        ph_name: 'Full Name',
        ph_email: 'Email Address',
        ph_phone: 'Phone',
        ph_subject: 'Subject',
        ph_message: 'Your Message',
        btn_send: 'Send Message'
    }
};

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // If key contains HTML (like spans in titles), use innerHTML
            if (key.includes('_title')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-value]').forEach(element => {
        const key = element.getAttribute('data-value');
        if (translations[lang][key]) {
            element.value = translations[lang][key];
        }
    });
}

langBtn.addEventListener('click', () => {
    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    setLanguage(newLang);
});

// Init Language
setLanguage(currentLang);



