/// API Connection to save uploaded Video
function VideoApi(payload) {
  var formdata = new FormData();
  formdata.append("createVideo", payload.createVideo, `video-user${payload.userId}`); 
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
console.log(formdata);

  return fetch(`${process.env.REACT_APP_BE_URL}/video/save?id=${payload.userId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export { VideoApi };