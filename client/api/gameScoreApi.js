/// API Connection to save game score
function InsertScoreApi (userId, gameUrl, totalRonde, skor) {
  const data = {
    userId,
    gameUrl,
    totalRonde,
    skor
  }
  return fetch(`${process.env.REACT_APP_BE_URL}/game/insert-score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error updating score:', error)
    })
};

export { InsertScoreApi }
