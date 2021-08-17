import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
    baseURL: 'http://cyberworx.co.in/viztown-2.0/admin/api/'
});
// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = 'G64uYuY1HyOV3HmANG0u2Z1hVaOCIPvQ9SB5hyxU';
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';

export default instance;