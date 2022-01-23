import axios from 'axios';

export const PostClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  // timeout: 1000,
  headers: {
    Accept: 'application/json',
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});
