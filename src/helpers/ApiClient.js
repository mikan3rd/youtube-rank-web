import axios from 'axios';

export default class ApiClient {
  constructor() {
    const port = 8080;
    const host = 'http://192.168.33.200';
    this._domain = `${host}${(port != null) ? `:${port}` : ''}`;
  }

  request(method, endpoint, params = null, headers = null) {
    const url = this._domain + endpoint;
    axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

    headers = Object.assign({}, headers);

    console.log(url);

    let options = {
      url: url,
      method: method,
      headers: headers,
      responseType: 'json',
    };

    if (method === 'GET') {
      options.params = params;
    } else {
      options.data = params;
    }

    return axios(options);
  }
}
