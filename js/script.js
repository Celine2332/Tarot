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

// Funktion, um die Karte mit dem niedrigsten Wert  finden--------------------------------------------
function findLowestCard(cards) {
    return cards.reduce((lowest, current) => {
        return current.value_int < lowest.value_int
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
            card.classList.add(`pos-${index}`);
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



// Kartenwerte

const cardValues = {
  // 1. Major Arcana (Wert 78-60, 19 Karten)
  'ar01': 78,
  'ar02': 77,
  'ar03': 76,
  'ar04': 75,
  'ar05': 74,
  'ar06': 73,
  'ar07': 72,
  'ar08': 71,
  'ar09': 70,
  'ar10': 69,
  'ar11': 68,
  'ar12': 67,
  'ar13': 66,
  'ar14': 65,
  'ar15': 64,
  'ar16': 63,
  'ar20': 62,
  'ar21': 61,
  'ar00': 60,
  
  // 2. Cups (Wert 59-45, 14 Karten: 1, dann 14-2)
  'cu01': 59,
  'cu14': 58,
  'cu13': 57,
  'cu12': 56,
  'cu11': 55,
  'cu10': 54,
  'cu09': 53,
  'cu08': 52,
  'cu07': 51,
  'cu06': 50,
  'cu05': 49,
  'cu04': 48,
  'cu03': 47,
  'cu02': 46,
  
  // 3. Wands (Wert 45-31, 14 Karten: 1, dann 14-2)
  'wa01': 45,
  'wa14': 44,
  'wa13': 43,
  'wa12': 42,
  'wa11': 41,
  'wa10': 40,
  'wa09': 39,
  'wa08': 38,
  'wa07': 37,
  'wa06': 36,
  'wa05': 35,
  'wa04': 34,
  'wa03': 33,
  'wa02': 32,
  
  // 4. Pentacles (Wert 31-17, 14 Karten: 1, dann 14-2)
  'pe01': 31,
  'pe14': 30,
  'pe13': 29,
  'pe12': 28,
  'pe11': 27,
  'pe10': 26,
  'pe09': 25,
  'pe08': 24,
  'pe07': 23,
  'pe06': 22,
  'pe05': 21,
  'pe04': 20,
  'pe03': 19,
  'pe02': 18,
  
  // 5. Swords (Wert 17-3, 14 Karten: 1, dann 14-2)
  'sw01': 17,
  'sw14': 16,
  'sw13': 15,
  'sw12': 14,
  'sw11': 13,
  'sw10': 12,
  'sw09': 11,
  'sw08': 10,
  'sw07': 9,
  'sw06': 8,
  'sw05': 7,
  'sw04': 6,
  'sw03': 4,
  'sw02': 3,  // Two of Swords = tiefster Wert!
};

//function getCardValue(card) {
//  return cardValues[card.name_short] || 0;
//}