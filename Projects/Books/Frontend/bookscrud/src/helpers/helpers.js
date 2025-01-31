export function setToken(userToken) {
  return sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export function setUser(user) {
  return sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const userData = sessionStorage.getItem('user');
  const user = JSON.parse(userData);
  return user;
}

export function setDarkMode(darkMode) {
  return sessionStorage.setItem('darkmode', JSON.stringify(darkMode));
}

export function getDarkMode() {
  const darkModeData = sessionStorage.getItem('darkmode');
  const darkMode = JSON.parse(darkModeData);
  console.log(darkMode);
  return darkMode;
}
