import {handleActions} from 'redux-actions';
import {Record, Map} from 'immutable';

import Actions from './actions';


const IndexRecord = Record({
  query: '',
  params: Map({
    query: '',
    period: 'weeks',
    videoCategoryId: null,
    channelFilter: true,
  }),
  results: [],
  isLoading: false,
  isSideOpen: false,
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
