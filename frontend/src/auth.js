export function authenticate(response) {
  localStorage.setItem('ongId', response.data.id);
  localStorage.setItem('ongName', response.data.name);
  sessionStorage.setItem('authToken', response.data.token);
}

export function deauthenticate() {
  localStorage.clear();
  sessionStorage.clear();
}

export function getAuthenticationData() {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const authToken = sessionStorage.getItem('authToken');

  return [ongId, ongName, authToken];
}

export function isAuthenticated() {
  const [ongId, ongName, authToken] = getAuthenticationData();
  return (ongId && ongName && authToken);
}
