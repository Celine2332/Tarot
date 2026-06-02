// DOM Elemente
const cardContainer = document.getElementById('card-container');
const overlay = document.getElementById('overlay');
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

// Handle shuffle animation click to start card game
const shuffleAnimation = document.getElementById('shuffleAnimation');
const shuffleCnt = document.getElementById('shuffleCnt');
const cardGameSection = document.querySelector('.cardGame');

if (shuffleAnimation && shuffleCnt && cardGameSection) {
    shuffleAnimation.addEventListener('click', () => {
        shuffleCnt.classList.add('hidden');
        cardGameSection.style.display = 'flex';
    });
    // Hide cardGame initially
    cardGameSection.style.display = 'none';
}



//Vorebereitung des Spiels
if (cardContainer) {
    init();
}
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
            card.value_int === lowestCard.value_int;
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

//------------------------------------------------------button platzhalter
        showNextButton();
//---------------------------------------------------------
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
        overlay.classList.add('hidden');
    });
}

//------------------------------------------------------------Platzhalter für next round button

function showNextButton() {
    const nextButton =
        document.getElementById('nextButton');
    if (!nextButton) return;
    nextButton.classList.remove('hidden');
}

function goToNextRound() {
    const currentRound = getCurrentRound();
    const nextRound = currentRound + 1;

// hier sollte anschliessend zum fortunate finalist gewechselt werden
    if (!GAME_MODES[nextRound]) {
        alert('Spiel beendet');
        return;
    }

    window.location.href =
        `game.html?round=${nextRound}`;
}

window.goToNextRound = goToNextRound;
//---------------------------------------------------------------------
