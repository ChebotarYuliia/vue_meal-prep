/* eslint-disable linebreak-style */
// firebase authentication

import firebase from 'firebase';

const axios = require('axios');

export const recipesRequest = async (url, plan) => {
  try {
    const response = await axios.get(url, {
      params: {
        q: plan,
        app_id: 'fad6d02a',
        app_key: 'fea2eaf2fa129469c92a54268d4210ce',
        from: 0,
        to: 9,
      },
    });
    return response.data.hits;
  } catch (error) {
    return [];
  }
};

// TODO

export function userJoinAuth(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const data = { user, authenticated: true };
      return data;
    })
    .catch(() => ({ user: null, authenticated: false }));
}

export function userSignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => ({ user, authenticated: true }))
    .catch(() => ({ user: null, authenticated: false }));
}
