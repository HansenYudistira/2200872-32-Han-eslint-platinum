function getAudioApi () {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/audio/get`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
}

export { getAudioApi }
