// API Connection to get user's information
function userProfileApi (id) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/profile/get/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
}

// API Connection to save updated user's information
function upsertProfileApi (id, profileUser) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('username', profileUser.username)
  urlencoded.append('email', profileUser.email)
  urlencoded.append('umur', profileUser.umur)
  urlencoded.append('city', profileUser.city)
  urlencoded.append('country', profileUser.country)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }
  return fetch(`${process.env.REACT_APP_BE_URL}/profile/upsert/${id}`, requestOptions)
    .then(response => response.json())
    // .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

// API Connection to get user's game history
function historyGameApi (id) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/profile/history/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
}

export { userProfileApi, upsertProfileApi, historyGameApi }
