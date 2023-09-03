/// API Connection to post information from register
function RegisterApi (payload) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('email', payload.email)
  urlencoded.append('username', payload.username)
  urlencoded.append('password', payload.password)
  urlencoded.append('confirmPassword', payload.confirmPassword)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/register`, requestOptions)
    .then(response => response.json())
  // .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export { RegisterApi }
