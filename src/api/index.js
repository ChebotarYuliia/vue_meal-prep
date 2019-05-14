/* eslint-disable linebreak-style */
// firebase authentication

const axios = require('axios');

const recipesRequest = async (url, plan) => {
  try {
    const response = await axios.get(url, {
      params: {
        q: plan,
        app_id: '594d6488',
        app_key: '0de2ca8eab280d4d04fa40a682af431b',
        from: 0,
        to: 9,
      },
    });
    return response.data.hits;
  } catch (error) {
    return [];
  }
};

export default recipesRequest;
