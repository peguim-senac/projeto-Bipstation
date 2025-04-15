document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.section_6_parceiros_div');
    const items = document.querySelectorAll('.section_6_parceiros_div_fotos');
    
    if (items.length < 2) return; // Se tiver menos de 2 itens, nem inicia o carrossel

    // Cria um wrapper interno pra animar os itens
    const innerWrapper = document.createElement('div');
    innerWrapper.className = 'section_6_parceiros_div_inner';
    container.appendChild(innerWrapper);

    // Adiciona os itens originais dentro do wrapper
    items.forEach(item => innerWrapper.appendChild(item));

    // Largura de cada item + espaçamento estimado (ajuste se necessário)
    const itemWidth = items[0].offsetWidth + 50;

    let currentPosition = 0;
    let animationId;
    const speed = 1.0; // velocidade do movimento
    let isMovingItem = false; // evita animações sobrepostas

    function animate() {
        // Se está em transição, espera terminar
        if (isMovingItem) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        currentPosition -= speed;

        // Quando o primeiro item estiver quase saindo da tela...
        if (-currentPosition >= itemWidth * 0.9) {
            isMovingItem = true;
            
            const firstItem = innerWrapper.firstElementChild;

            // Aplica fade out antes de mover o item
            firstItem.style.transition = 'opacity 0.3s ease-out';
            firstItem.style.opacity = '0';

            setTimeout(() => {
                // Move o item pro final da fila sem animação
                firstItem.style.transition = 'none';
                firstItem.style.transform = `translateX(${itemWidth * (items.length - 1)}px)`;
                innerWrapper.appendChild(firstItem); // coloca no fim

                setTimeout(() => {
                    // Aplica fade in e reseta transform
                    firstItem.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-out';
                    firstItem.style.opacity = '1';
                    firstItem.style.transform = '';

                    // Corrige posição geral do wrapper
                    currentPosition += itemWidth;
                    innerWrapper.style.transform = `translateX(${currentPosition}px)`;

                    isMovingItem = false;
                }, 50); // delay pequeno pra garantir que o DOM aplique a mudança
            }, 300); // espera o fade-out
        }

        // Move o carrossel
        innerWrapper.style.transform = `translateX(${currentPosition}px)`;
        animationId = requestAnimationFrame(animate); // continua o loop
    }

    animate(); // inicia a animação

    // Cancela animação se a página for fechada/atualizada
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
});