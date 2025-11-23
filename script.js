// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Fermer le menu mobile en cliquant sur un lien
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Animation au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Gestion du formulaire de contact
// Réinitialisation du formulaire après envoi
document.querySelector('form').addEventListener('submit', function(e) {
    // Laisser Formspree gérer l'envoi
    // Après 2 secondes, réinitialiser le formulaire
    setTimeout(() => {
        this.reset();
        
        // Message de confirmation (optionnel)
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Message envoyé !';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 3000);
        
    }, 2000);
});
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Afficher les données dans la console
    console.log("Nouveau message reçu:");
    console.log("Nom:", name);
    console.log("Email:", email);
    console.log("Téléphone:", phone);
    console.log("Message:", message);
    
    // Stocker dans le localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        date: new Date().toLocaleString(),
        name: name,
        email: email,
        phone: phone,
        message: message
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    alert(`Merci ${name} ! Votre message a été envoyé. Nous vous répondrons bientôt à ${email}.`);
    
    // Réinitialisation du formulaire
    contactForm.reset();
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Fonction pour afficher les messages (à appeler depuis la console navigateur)
function showMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    console.table(messages);
    return messages;

}
