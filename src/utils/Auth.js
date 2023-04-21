export const BASE_URL = "https://auth.nomoreparties.co";

export class Auth{

  constructor(config){

  }

  async signin(email, password) {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    });

    return response;
  }

  async signup(email, password) {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    return response;
  }

  async checkUserSession(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });

    return response;
  }

}

const auth = new Auth();

export default auth;
