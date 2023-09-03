function getAudioApi (user_id) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  return fetch(`${process.env.REACT_APP_BE_URL}/audio/get?id=${user_id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
}

/// API Connection to save uploaded Audio
function UploadAudioApi (payload) {
  const formdata = new FormData()
  formdata.append('createAudio', payload.createAudio, `audio-user${payload.userId}`)
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }
  console.log(formdata)

  return fetch(`${process.env.REACT_APP_BE_URL}/audio/save?id=${payload.userId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
}

export { getAudioApi, UploadAudioApi }
