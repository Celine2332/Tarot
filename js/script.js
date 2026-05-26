const cardContainer = document.getElementById('card-container');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');



// API

async function loadCards(startingNummber) {

    const url = 'https://tarotapi.dev/api/v1/cards/random?n=' + startingNummber;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.cards;

    } catch(error) {
        console.error(error);

    }
}



// Start

init();

async function init() {

    const cards = await loadCards(4);

    createCards(cards);
    console.info(cards);

}




// Karten erzeugen

function createCards(cards) {

    for (const cardData of cards) {
        const shortName = cardData.name_short;
        const imagePath = `assets/images/${shortName}.png`;
        const card = document.createElement('div');

        card.classList.add('karten');
            // Startposition = oben mittig
          // card.style.top = '0';
          // card.style.left = '50%';
          // card.style.transform = 'translateX(-50%)';

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

    setTimeout(() => {
        const index = cards.indexOf(cardData);
        card.classList.add(`pos-${index}`);
    }, 1200);

        const innerCard = card.querySelector('.card');

   
// Karten automatisch umdrehen

        setTimeout(() => {
            innerCard.classList.add('flipped');
        }, 2200);


// Overlay öffnen

        card.addEventListener('click', () => {
            showOverlay(cardData);
        });
    }
}




// Overlay anzeigen

function showOverlay(cardData) {
    overlayTitle.textContent = cardData.name;
    overlayText.textContent = cardData.meaning_up;
    overlay.classList.remove('hidden');

}




// Overlay schließen

overlay.addEventListener('click', () => {

    overlay.classList.add('hidden');

});

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

function getCardValue(card) {
  return cardValues[card.name_short] || 0;
}