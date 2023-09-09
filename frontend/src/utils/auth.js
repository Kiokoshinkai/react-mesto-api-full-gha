// проверка ответа
function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//Базовый URL
export const BASE_URL = "https://auth.nomoreparties.co";

//регистрация
export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponseData);
}

//авторизация
export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {"Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponseData);
}

//проверка валидности и получения email
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
    },
  }).then(getResponseData);
}
