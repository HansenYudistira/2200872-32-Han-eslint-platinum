/// API Connection to save game score
function InsertScoreApi (user_id, game_url, total_ronde, skor) {
  const data = {
    user_id,
    game_url,
    total_ronde,
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
