// DOM Elemente
const cardContainer = document.getElementById('card-container');
let cardsClickable = false;
const overlay = document.getElementById('overlay');
let finalMode = false;
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const overlayContent = document.querySelector('.overlay-content');
const GAME_MODES = {
    1: 4,
    2: 3,
    3: 2
};



// Hamburger Menü
const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuItems = document.querySelector('.menu-items');

if (hamburgerBtn && menuItems) {
    hamburgerBtn.addEventListener('click', () => {
        menuItems.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    });
}

const playerSelect = document.getElementById("playerSelect");
if (playerSelect) {
    playerSelect.addEventListener("change", (e) => {
        const round = e.target.value;

        if (round) {
            window.location.href = `game.html?round=${round}`;
        }
    });
}



//Buttons
const startButton = document.getElementById('startButton');

if (startButton) {
    startButton.addEventListener('click', () => {
        window.location.href = 'anleitung.html';
    });
}

const playersButton = document.getElementById('playersButton');

if (playersButton) {
    playersButton.addEventListener('click', () => {
        window.location.href = 'players.html';
    });
}

const lastStep = document.getElementById('lastStep');
if (playersButton && lastStep) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            playersButton.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

observer.observe(lastStep);
}

// Handle shuffle animation click to start card game
const shuffleAnimation = document.getElementById('shuffleAnimation');
const shuffleCnt = document.getElementById('shuffleCnt');
const shuffleOverlays = document.querySelector('.shuffle_overlays');
const cardGameSection = document.querySelector('.cardGame');

let shuffleStarted = false;

async function handleShuffleClick(e) {
    if (shuffleStarted) return;
    // ignore clicks on internal interactive elements (if any)
    shuffleStarted = true;
    if (cardGameSection) cardGameSection.style.display = 'none';
    if (shuffleCnt) shuffleCnt.classList.add('hidden');
    if (cardGameSection) cardGameSection.style.display = 'flex';
    await init();
}

// starts dealing cards after click — accept clicks on the lottie, container, or overlays
if (cardGameSection && shuffleCnt) {
    cardGameSection.style.display = 'none';
    if (shuffleAnimation) shuffleAnimation.addEventListener('click', handleShuffleClick);
    shuffleCnt.addEventListener('click', handleShuffleClick);
    if (shuffleOverlays) shuffleOverlays.addEventListener('click', handleShuffleClick);
}



//Vorebereitung des Spiels
async function init() {
    const round = getCurrentRound();
    const cardCount = GAME_MODES[round];
        if (!cardCount) {
        console.error('Ungültige Runde');
        return;
    }
    const cards = await loadCards(cardCount);

    console.log(cards);

// -------------------------------------------------------- Karte mit dem niedrigsten Wert
    const lowestCard = findLowestCard(cards);

    cards.forEach(card => {
        card.isReversed =
            cardValues[card.name_short] === cardValues[lowestCard.name_short];
    });

    console.table(
    cards.map(card => ({
        name: card.name,
        short: card.name_short,
        CardValue: cardValues[card.name_short],
        lowest: card === lowestCard
    }))
);
// ------------------------------------------------------------------------------------------
    createCards(cards);
}

// ermittelt die aktuelle Runde aus der URL, Standard ist 1
function getCurrentRound() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('round')) || 1;
}



// API

async function loadCards(amount) {
    const url =
        `https://tarotapi.dev/api/v1/cards/random?n=${amount}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.cards;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}



// Kartenwerte für alle Karten, basierend auf der Tarot-Deck-Struktur
const cardValues = {};
let value = 78;

// Major Arcana
for (let i = 21; i >= 0; i--) {
    cardValues[`ar${String(i).padStart(2, '0')}`] = value--;
}

// Suits
const suits = ['cu', 'wa', 'pe', 'sw'];
const ranks = [
    'ac', 'ki', 'qu', 'kn', 'pa',
    '10', '09', '08', '07', '06',
    '05', '04', '03', '02'
];

for (const suit of suits) {
    for (const rank of ranks) {
        cardValues[suit + rank] = value--;
    }
}

function getCardValue(card) {
    return cardValues[card.name_short];
}

// Funktion, um die Karte mit dem niedrigsten Wert  finden--------------------------------------------
function findLowestCard(cards) {
    return cards.reduce((lowest, current) => {
        return cardValues[current.name_short] < cardValues[lowest.name_short]
            ? current
            : lowest;
    });
}
//------------------------------------------------------------------------------------------------



// Game Start

// Karten erzeugen
function createCards(cards) {
    cards.forEach((cardData, index) => {

        const shortName = cardData.name_short;
        const imagePath =`assets/images/${shortName}.png`;
        const card = document.createElement('div');

//Kartencontainer mit class für css
        card.classList.add('karten');
        card.cardData = cardData;

//Karteninhalt mit Vorder- und Rückseite
        card.innerHTML = `
            <div class="card">
                <div class="face face-front">
                    <img src="${imagePath}" alt="${cardData.name}">
                </div>

                <div class="face face-back">
                    <img src="assets/images/back.png" alt="back">
                </div>
            </div>
`;
        cardContainer.appendChild(card);

// Kartenpositionierung mit Verzögerung
        setTimeout(() => {
            const round = getCurrentRound();
            card.classList.add(
                `round-${round}-pos-${index}`
            );
        }, 1200);

//Overlay anzeigen bei Klick auf Karte
        card.addEventListener('click', () => {
            if (!cardsClickable) return;
                if(finalMode) return;

                const currentRound = getCurrentRound();
                if (currentRound === 3 &&
                    !cardData.isReversed) {
                    showFinalWinner(card, cardData);
                    return;}
                showOverlay(cardData);
            });
        });
    startCardAnimation();
}

// Karten umdrehen nach 3,2 Sekunden
function startCardAnimation() {
    setTimeout(() => {
        document
            .querySelectorAll('.card')
            .forEach(card => {
                card.classList.add('flipped');
            });

// Nach dem Umdrehen Rahmen anzeigen
        setTimeout(() => {
        cardsClickable = true;
            document
                .querySelectorAll('.karten')
                .forEach(cardElement => {
                    const cardData =
                        cardElement.cardData;
                    const innerCard =
                        cardElement.querySelector('.card');
//-----------------------------------------------------------------negative oder positive Karte
                    if (cardData.isReversed) {
                        innerCard.classList.add('negative');
                    } else {
                        innerCard.classList.add('positive');
                    }
//----------------------------------------------------------------
                });
        showNextButton();
        }, 800);
    }, 3200);

}

// Overlay anzeigen
function showOverlay(cardData) {
    overlayTitle.textContent = cardData.name;
    overlayContent.classList.remove(
        'positive',
        'negative'
    );

    if (cardData.isReversed) {
        overlayText.textContent =
            cardData.meaning_rev;

        overlayContent.classList.add(
            'negative'
        );
    }
    else {
        overlayText.textContent =
            cardData.meaning_up;

        overlayContent.classList.add(
            'positive'
        );
    }

    overlay.classList.remove('hidden');
}

// Overlay schließen
if (overlay) {
    overlay.addEventListener('click', () => {
                if (finalMode) return;
        overlay.classList.add('hidden');
    });
}


// Next round button

function showNextButton() {
    const nextButton = document.getElementById('nextButton');
    const finalButton = document.getElementById('finalButton');
    const round = getCurrentRound();

    if (round === 3) {
        finalButton?.classList.remove('hidden');
        nextButton?.classList.add('hidden');
    } else {
        nextButton?.classList.remove('hidden');
        finalButton?.classList.add('hidden');
    }
}

function goToNextRound() {
    const currentRound = getCurrentRound();
    const nextRound = currentRound + 1;

// Spielende - zurück zum Menu
        if (!GAME_MODES[nextRound]) {
            window.location.href = 'index.html';
            return;
        }

    window.location.href =
        `game.html?round=${nextRound}`;
}

function goToFinalAction() {
    window.location.href = 'index.html';
}


// Gewinnerkarte
function showFinalWinner(cardElement, cardData) {

    finalMode = true;

// andere Karte ausblenden
    document.querySelectorAll('.karten')
        .forEach(card => {

            if (card !== cardElement) {
                card.classList.add('fade-out');
            }
        });

// Gewinnerkarte animieren
    cardElement.classList.add('winner-card');
        const title = document.createElement('div');

    title.classList.add('winner-title');

    title.innerHTML = `
        dear player,<br>
        you are a fortunate finalist!
    `;

    document.body.appendChild(title);

    // Sternenhintergrund anzeigen
    createStars();
        
    function createStars(){
        for(let i = 0; i < 27; i++){
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left =
                Math.random() * 100 + '%';
            star.style.top =
                Math.random() * 100 + '%';
            star.style.animationDelay =
                Math.random() * 1.8 + 's';
            document.body.appendChild(star);
        }
    }

// Rückseite der Karte ersetzen
    const backFace =
        cardElement.querySelector('.face-back');

    backFace.innerHTML = `
        <div class="winner-content">
            <h3>${cardData.name.toLowerCase()}</h3>
            <p>${cardData.meaning_up}</p>
        </div>
    `;

// Karte wieder umdrehen
    const innerCard =
        cardElement.querySelector('.card');

    innerCard.classList.remove('flipped');

    cardElement.addEventListener('click', () => {
        innerCard.classList.toggle('flipped');
    });
}

window.goToNextRound = goToNextRound;
window.goToFinalAction = goToFinalAction;
//---------------------------------------------------------------------
