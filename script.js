// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Intersection Observer for scroll animations
const fadeElements = document.querySelectorAll('.hero-content, .hero-image, .about-text, .about-image, .service-card, .cta-box, .gallery-img, .gallery');

// Adding base class for animation
fadeElements.forEach(el => el.classList.add('fade-up'));

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    observer.observe(el);
});

// Change navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Multi-language support (i18n)
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_about: "Nos Kibbehs",
        nav_gallery: "Galerie",
        gallery_title: "Notre Galerie",
        gallery_subtitle: "Un aperçu de nos délicieux plateaux de kibbehs",
        nav_services: "Services",
        nav_order: "Commander",
        hero_badge: "Spécialité Libanaise Authentique",
        hero_title: "Kibbeh au bon goût et pimenté selon votre choix",
        hero_desc: "Commandez en gros pour vos cérémonies et dégustez les meilleurs kibbehs.",
        ticker_text: "✨ Un prix spécial est réservé pour les cérémonies : Mariages, Baptêmes, Anniversaires ✨",
        hero_btn_order: "Passer ma commande",
        hero_btn_services: "Découvrir nos services",
        about_title: "L'Authentique Goût du Liban",
        about_desc: "Nos kibbehs sont préparés avec amour selon une recette traditionnelle libanaise, garantissant une croûte parfaitement dorée et un cœur moelleux et savoureux.",
        flavor_mild_title: "Au Bon Goût (Doux)",
        flavor_mild_desc: "Parfait pour ceux qui préfèrent des saveurs riches et délicates sans la chaleur.",
        flavor_spicy_title: "Pimenté",
        flavor_spicy_desc: "Une explosion de saveurs relevée par du piment frais pour les amateurs de sensations fortes.",
        services_title: "Nos Services",
        services_subtitle: "Adaptés à tous vos besoins événementiels",
        srv_wholesale_title: "Commandes en Gros",
        srv_wholesale_desc: "Idéal pour les réunions familiales, entreprises et grands rassemblements. Tarifs préférentiels pour les grandes quantités.",
        srv_ceremony_title: "Spécial Cérémonies",
        srv_ceremony_desc: "Mariages, baptêmes, anniversaires... Ajoutez une touche d'authenticité à tous vos événements spéciaux.",
        contact_title: "Prêt à savourer les meilleurs Kibbehs ?",
        contact_desc: "Contactez Marie Josée Vaval dès aujourd'hui pour passer votre commande.",
        payment_title: "Moyens de paiement acceptés",
        payment_desc: "Nous acceptons les paiements par Zelle ou transfert direct.",
        footer_rights: "Tous droits réservés."
    },
    en: {
        nav_home: "Home",
        nav_about: "Our Kibbehs",
        nav_gallery: "Gallery",
        gallery_title: "Our Gallery",
        gallery_subtitle: "A glimpse of our delicious kibbeh platters",
        nav_services: "Services",
        nav_order: "Order Now",
        hero_badge: "Authentic Lebanese Specialty",
        hero_title: "Mild or Spicy Kibbeh of your choice",
        hero_desc: "Order wholesale for your ceremonies and enjoy the best kibbehs.",
        ticker_text: "✨ A special price is reserved for ceremonies: Weddings, Baptisms, Birthdays ✨",
        hero_btn_order: "Place my order",
        hero_btn_services: "Discover our services",
        about_title: "The Authentic Taste of Lebanon",
        about_desc: "Our kibbehs are prepared with love using a traditional Lebanese recipe, ensuring a perfectly golden crust and a soft, savory center.",
        flavor_mild_title: "Mild Flavor",
        flavor_mild_desc: "Perfect for those who prefer rich and delicate flavors without the heat.",
        flavor_spicy_title: "Spicy",
        flavor_spicy_desc: "An explosion of flavors enhanced by fresh hot peppers for thrill-seekers.",
        services_title: "Our Services",
        services_subtitle: "Tailored to all your event needs",
        srv_wholesale_title: "Wholesale Orders",
        srv_wholesale_desc: "Ideal for family reunions, corporate events, and large gatherings. Preferential rates for large quantities.",
        srv_ceremony_title: "Special Ceremonies",
        srv_ceremony_desc: "Weddings, baptisms, birthdays... Add a touch of authenticity to all your special events.",
        contact_title: "Ready to enjoy the best Kibbehs?",
        contact_desc: "Contact Marie Josée Vaval today to place your order.",
        payment_title: "Accepted Payment Methods",
        payment_desc: "We accept payments via Zelle or direct transfer.",
        footer_rights: "All rights reserved."
    }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Mettre à jour la barre défilante
    const tickerText = translations[lang]['ticker_text'];
    if (tickerText) {
        document.querySelectorAll('.ticker__item').forEach(item => {
            item.textContent = tickerText;
        });
    }

    document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    
    document.documentElement.lang = lang;
}

document.getElementById('lang-fr').addEventListener('click', (e) => { e.preventDefault(); setLanguage('fr'); });
document.getElementById('lang-en').addEventListener('click', (e) => { e.preventDefault(); setLanguage('en'); });

// Initialize translation on page load
setLanguage(currentLang);
