const cardContainer = document.getElementById('card-container');

const overlay = document.getElementById('overlay');

const overlayTitle = document.getElementById('overlay-title');

const overlayText = document.getElementById('overlay-text');



// ─────────────────────
// API
// ─────────────────────

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



// ─────────────────────
// Start
// ─────────────────────

init();

async function init() {

    const cards = await loadCards(4);

    createCards(cards);
    console.info(cards);

}



// ─────────────────────
// Karten erzeugen
// ─────────────────────

function createCards(cards) {

    for (const cardData of cards) {

        const shortName = cardData.name_short;

        const imagePath = `assets/images/${shortName}.png`;



        const card = document.createElement('div');

        card.classList.add('karten');



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



        const innerCard = card.querySelector('.card');



        // ─────────────────────
        // Karten automatisch umdrehen
        // ─────────────────────

        setTimeout(() => {

            innerCard.classList.add('flipped');

        }, 500);



        // ─────────────────────
        // Overlay öffnen
        // ─────────────────────

        card.addEventListener('click', () => {

            showOverlay(cardData);

        });

    }

}



// ─────────────────────
// Overlay anzeigen
// ─────────────────────

function showOverlay(cardData) {

    overlayTitle.textContent = cardData.name;

    overlayText.textContent = cardData.meaning_up;

    overlay.classList.remove('hidden');

}



// ─────────────────────
// Overlay schließen
// ─────────────────────

overlay.addEventListener('click', () => {

    overlay.classList.add('hidden');

});