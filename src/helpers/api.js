import ApiClient from './ApiClient';

const client = new ApiClient();

class SearchApi {

  static async get(params) {
    const endpoint = '/search';

    try {
      return await client.request('GET', endpoint, params);
    } catch (e) {
      console.log('エラー:', e);
      return {data: []};
    }
  }
}


export {
  SearchApi,
};
