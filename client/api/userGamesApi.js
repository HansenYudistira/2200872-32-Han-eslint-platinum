/// API Connection to get list games played by certain user
function UserPlayedGames (id) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/usergame/played/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
};

/// API Connection to get total score per user
function UserTotalScore (id) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/usergame/totalskor/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
};

export { UserPlayedGames, UserTotalScore }
