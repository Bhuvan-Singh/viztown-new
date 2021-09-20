import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
    baseURL: process.env.API_URL
});
// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION_KEY;
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';

export default instance;