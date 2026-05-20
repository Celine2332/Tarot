console.log ('works')

async function startGame(stop) {
  try {
    const response = await fetch(
      `https://tarotapi.dev/api/v1/cards/random`,
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}




// ── Flip-Logik ───────────────────────────────
const card  = document.getElementById('card');
const scene = document.getElementById('finalist');

function flip() {
  card.classList.toggle('flipped');
  // Klasse 'flipped' → CSS dreht .card um 180°
}

// Klick / Touch
finalist.addEventListener('click', flip);

// Tastatur (Enter / Space)
finalist.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flip();
  }
});