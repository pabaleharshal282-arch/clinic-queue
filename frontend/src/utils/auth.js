/** Simple admin auth - localStorage based (no backend session) */
const KEY = 'admin_logged_in';

export function isAdminLoggedIn() {
  return localStorage.getItem(KEY) === 'true';
}

export function setAdminLoggedIn() {
  localStorage.setItem(KEY, 'true');
}

export function logoutAdmin() {
  localStorage.removeItem(KEY);
}
