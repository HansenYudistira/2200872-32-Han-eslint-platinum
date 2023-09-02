/// API Connection to get list of community
function CommunityApi () {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/player/community`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
};

/// API Connection to get list of leaderboard
function LeaderboardAPI () {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/player/leaderboard`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
};

export { CommunityApi, LeaderboardAPI }
