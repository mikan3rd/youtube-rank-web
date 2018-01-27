import CounterActions from './actions';
import Index from './model';
import {handleActions} from 'redux-actions';


export default handleActions({
  [CounterActions.authToken]: (state, action) => {
    return state.authorize();
  },
  [CounterActions.login]: (state, action) => {
    return state.login();
  },
  [CounterActions.logout]: (state, action) => {
    return new Index();
  },
}, new Index());
