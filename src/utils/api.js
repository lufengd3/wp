const BASE_URL = 'http://0.0.0.0:6789';

export function updateRemoteUrl(url) {
  const apiUrl = `${BASE_URL}/update?url=${url}`;
  fetch(apiUrl, {
    method: 'GET',
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  }).then(json => {
    console.log(json);
  }).catch(error => {
    console.log(error);
  })
}