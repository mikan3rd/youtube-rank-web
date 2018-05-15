import axios from 'axios';

export default class ApiClient {
  constructor() {

    // let port = 3333;
    // let host = 'http://0.0.0.0';
    let port = null;
    let host = 'https://youtube-rank-api.herokuapp.com';
    console.log(process.env);

    if (process.env.NODE_ENV === 'production') {
      port = null;
      host = 'https://youtube-rank-api.herokuapp.com';
    }
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
