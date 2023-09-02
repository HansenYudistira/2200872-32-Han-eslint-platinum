/// API Connection to post login information
function LoginApi (payload) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('username', payload.username)
  urlencoded.append('password', payload.password)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/login`, requestOptions)
    .then(response => response.json())
  // .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

/// API Connection to get auth from BE
function GetLoginAuthFromMainBE () {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
}

export { LoginApi, GetLoginAuthFromMainBE }
