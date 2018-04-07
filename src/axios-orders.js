import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-adb5c.firebaseio.com/'
});

export default instance;
