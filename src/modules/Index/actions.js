import {createAction} from 'redux-actions';

const getSearchResult = createAction('Index/getSearchResult');
const changeValueForKey = createAction('Index/changeValueForKey');
const changeValueOfParams = createAction('Index/changeValueOfParams');

export default {
  getSearchResult,
  changeValueForKey,
  changeValueOfParams,
};
