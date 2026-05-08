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
