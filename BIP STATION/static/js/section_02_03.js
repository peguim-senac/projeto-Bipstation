document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".funcio_00");
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoSlide;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove("active");
            if (i === index) {
                card.classList.add("active");
            }
        });
    }

    function nextCard() {
        let nextIndex = (currentIndex + 1) % totalCards;
        fadeTransition(currentIndex, nextIndex);
        currentIndex = nextIndex;
    }

    function prevCard() {
        let prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        fadeTransition(currentIndex, prevIndex);
        currentIndex = prevIndex;
    }

    function fadeTransition(oldIndex, newIndex) {
        cards[oldIndex].style.opacity = "0";
        setTimeout(() => {
            cards[oldIndex].classList.remove("active");
            cards[newIndex].classList.add("active");
            cards[newIndex].style.opacity = "1";
        }, 800); // Tempo da transição
    }

    document.querySelectorAll(".next").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            nextCard();
            resetAutoSlide();
        });
    });

    document.querySelectorAll(".prev").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            prevCard();
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlide = setInterval(nextCard, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    showCard(currentIndex);
    startAutoSlide();
});



// inicio javascrip antonio mychel
const cards = document.querySelectorAll('.section_03_card');
const prevBtn = document.querySelector('.section_03_prev_btn');
const nextBtn = document.querySelector('.section_03_next_btn');
let currentIndex = 0;

function updateCards() {
    cards.forEach((card, index) => {
        card.classList.remove('section_03_card_active', 'section_03_card_previous', 'section_03_card_next', 'section_03_card_hidden');
        if (index === currentIndex) {
            card.classList.add('section_03_card_active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('section_03_card_previous');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('section_03_card_next');
        } else {
            card.classList.add('section_03_card_hidden');
        }
    });
}

prevBtn.addEventListener('click', () => {
    console.log('Botão anterior clicado', currentIndex);
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
});

updateCards();
// fim javascrip antonio mychel



