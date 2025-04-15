const hamburger = document.getElementById('hamburger');
        const menuLinks = document.getElementById('menuLinks');
    
        hamburger.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
        });
    // Script para corrigir a rolagem e evitar o "overlap" com o header fixo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Define o offset de acordo com a altura do seu header
        const offset = 70;  // Ajuste este valor para a altura do seu header

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth' // Rolagem suave
        });
    });
});