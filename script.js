document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO DOM ---
    const openLetterBtn = document.getElementById('open-letter-btn');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    let player; // A variável do player é declarada aqui

    // --- LÓGICA DA TELA DE ABERTURA E MÚSICA (VERSÃO CORRIGIDA PARA TELEMÓVEL) ---

    // 1. Torna a função de callback da API do YouTube acessível globalmente.
    // A API do YouTube procurará por 'window.onYouTubeIframeAPIReady'.
    window.onYouTubeIframeAPIReady = function() {
        // Cria a instância do player mas ainda não o inicia.
        // Apenas pré-carrega o vídeo e prepara o player.
        player = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: 'sXybcOjldq4', // ID da sua música
            playerVars: {
                'playsinline': 1, // Essencial para a reprodução no iOS
                'controls': 0,    // Ocultar controlos
                'loop': 1,        // Repetir a música
                'playlist': 'sXybcOjldq4' // Necessário para o loop funcionar
            },
            events: {
                // A função 'onReady' é chamada quando o player está pronto.
                'onReady': onPlayerReady
            }
        });
    };

    // 2. Esta função é chamada quando o player está pronto a receber comandos.
    function onPlayerReady(event) {
        // Agora que o player está pronto, ativa o botão.
        openLetterBtn.disabled = false;
        openLetterBtn.textContent = 'Abrir carta';
    }

    // 3. Adiciona o evento de clique ao botão, que agora tem uma única responsabilidade.
    openLetterBtn.addEventListener('click', () => {
        // Esconde a tela de abertura e mostra o conteúdo principal
        splashScreen.classList.add('hidden');
        mainContent.classList.add('visible');
        setTimeout(() => {
            splashScreen.remove();
        }, 1000);

        // 4. Dá o comando de reprodução. Esta é a ação mais direta possível
        // ligada ao toque do utilizador, o que maximiza a compatibilidade com telemóveis.
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            player.unMute(); // Garante que o som não esteja no mudo
        }
    });


    // --- LÓGICA PRINCIPAL DA PÁGINA (RESTO DO CÓDIGO SEM ALTERAÇÕES) ---
    
    const startDate = new Date('2019-02-05T00:00:00');
    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const christmasesEl = document.getElementById('christmases');
    const valentinesEl = document.getElementById('valentines');
    const fullMoonsEl = document.getElementById('fullMoons');
    const bodasListEl = document.getElementById('bodasList');
    
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    const bodas = [
        { year: 1, name: 'Bodas de Papel' }, { year: 2, name: 'Bodas de Algodão' },
        { year: 3, name: 'Bodas de Couro ou Trigo' }, { year: 4, name: 'Bodas de Flores e Frutas' },
        { year: 5, name: 'Bodas de Madeira ou Ferro' }, { year: 6, name: 'Bodas de Açúcar ou Perfume' },
        { year: 7, name: 'Bodas de Latão ou Lã' }, { year: 8, name: 'Bodas de Papoula ou Barro' },
        { year: 9, name: 'Bodas de Cerâmica ou Vime' }, { year: 10, name: 'Bodas de Estanho ou Zinco' },
    ];

    function updateTimeUnit(element, newValue) {
        if (element.textContent !== newValue) {
            element.textContent = newValue;
            element.classList.add('animate');
            setTimeout(() => {
                element.classList.remove('animate');
            }, 600);
        }
    }

    function updateCounter() {
        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
        if (months < 0) { years--; months += 12; }
        updateTimeUnit(yearsEl, String(years));
        updateTimeUnit(monthsEl, String(months));
        updateTimeUnit(daysEl, String(days));
        updateTimeUnit(hoursEl, String(now.getHours()).padStart(2, '0'));
        updateTimeUnit(minutesEl, String(now.getMinutes()).padStart(2, '0'));
        updateTimeUnit(secondsEl, String(now.getSeconds()).padStart(2, '0'));
    }

    function calculateFunFacts() {
        const now = new Date();
        let christmasesCount = 0, valentinesCount = 0;
        for (let year = startDate.getFullYear(); year <= now.getFullYear(); year++) {
            if (new Date(year, 11, 25) > startDate && new Date(year, 11, 25) <= now) christmasesCount++;
            if (new Date(year, 5, 12) > startDate && new Date(year, 5, 12) <= now) valentinesCount++;
        }
        const totalDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        const fullMoonsCount = Math.floor(totalDays / 29.53);
        christmasesEl.innerText = christmasesCount;
        valentinesEl.innerText = valentinesCount;
        fullMoonsEl.innerText = fullMoonsCount;
    }
    
    function displayBodas() {
        const now = new Date();
        bodasListEl.innerHTML = ''; 
        bodas.forEach(boda => {
            const bodaDate = new Date(startDate);
            bodaDate.setFullYear(startDate.getFullYear() + boda.year);
            const li = document.createElement('li');
            const bodaDateString = bodaDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            if (now >= bodaDate) {
                li.classList.add('completed');
                li.innerText = `${boda.name} (${boda.year}º ano) - Celebrado em ${bodaDateString}`;
            } else {
                const diffTime = bodaDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                li.innerText = `${boda.name} (${boda.year}º ano) - Faltam ${diffDays} dias (será em ${bodaDateString})`;
            }
            bodasListEl.appendChild(li);
        });
    }

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
        const captureArea = document.getElementById('captureArea');
        html2canvas(captureArea, { useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'nosso-tempo-juntos.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // --- INICIALIZAÇÃO ---
    updateCounter();
    calculateFunFacts();
    displayBodas();
    setInterval(updateCounter, 1000);
});
