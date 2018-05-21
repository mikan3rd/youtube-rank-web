import {createAction} from 'redux-actions';

const getSearchResult = createAction('Index/getSearchResult');
const changeValueForKey = createAction('Index/changeValueForKey');
const changeValueOfParams = createAction('Index/changeValueOfParams');
const sendStripeToken = createAction('Index/sendStripeToken');

export default {
  getSearchResult,
  changeValueForKey,
  changeValueOfParams,
  sendStripeToken,
};
