export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
 .then((response) => {
      if (response.ok){
        return response.json();
      }
      else{
        return response.status;
      }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}; 


export const logIn = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
   .then((response) => {
      try {
        if (response.status === 200){
          return response.json();
        }
        if (response.status === 400){
          return console.log("пользователь с email не найден");
        }
      } catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }; 