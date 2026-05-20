//vorlage

async function loadData() {
    const url = 'https://tarotapi.dev/api/v1/cards/random'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadData();

console.log(data);

// API liefert:
/// data.cards[0].name_short

const shortName = data.cards[0].name_short;

console.log(shortName);

// Bildpfad erzeugen
const imagePath = `assets/images/${shortName}.png`;

// Front-Bild ersetzen
const tarotImage = document.getElementById('tarot-image');

tarotImage.src = imagePath;
tarotImage.alt = shortName;


// Flip-Logik 
const card  = document.getElementById('card');
const scene = document.getElementById('finalist');

function flip() {
  card.classList.toggle('flipped');
}

finalist.addEventListener('click', flip);
