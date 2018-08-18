import axios from 'axios'
axios.defaults.headers['X-CSRF-TOKEN'] = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers['Accept'] = 'application/json';
export default axios;