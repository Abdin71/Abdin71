interface UserToken {
  token: string;
  [key: string]: any;
}

interface User {
  id: string;
  name: string;
  [key: string]: any;
}

export function setToken(userToken: UserToken | null): void {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken(): string | undefined {
  const tokenString = sessionStorage.getItem('token');
  const userToken: UserToken = JSON.parse(tokenString || '{}');
  return userToken?.token;
}

export function setUser(user: User | null): void {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): User | null {
  const userData = sessionStorage.getItem('user');
  const user: User = JSON.parse(userData || '{}');
  return user;
}

export function isUserLoggedIn(): boolean {
  const user = getUser();
  return user !== null ? true : false;
}

export function setDarkMode(darkMode: boolean): void {
  sessionStorage.setItem('darkmode', JSON.stringify(darkMode));
}

export function getDarkMode(): boolean | null {
  const darkModeData = sessionStorage.getItem('darkmode');
  const darkMode = JSON.parse(darkModeData || 'false');
  console.log(darkMode);
  return darkMode;
}