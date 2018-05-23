import {handleActions} from 'redux-actions';
import {Record, Map, List} from 'immutable';

import Actions from './actions';


let params = Map({
  query: '',
  period: 'month',
  videoCategoryId: null,
  channelFilter: false,
});
const searchParamsJson = localStorage.getItem('searchParams');
if (searchParamsJson) {
  params = Map(JSON.parse(searchParamsJson));
}

let tags = List();
const recommendTagsJson = localStorage.getItem('recommendTags');
if (recommendTagsJson) {
  const recommendTags = JSON.parse(recommendTagsJson);
  tags = List(recommendTags.map((tag) => Map(tag)));
}


const IndexRecord = Record({
  params,
  results: [],
  tags,
  isLoading: false,
  isSideOpen: false,
  isOpenModal: null,
});

class Index extends IndexRecord {
}


export default handleActions({
  [Actions.changeValueForKey]: (state, action) => {
    const {key, value} = action.payload;
    return state.set(key, value);
  },
  [Actions.changeValueOfParams]: (state, action) => {
    const {key, value} = action.payload;
    return state.setIn(['params', key], value);
  },
}, new Index());
