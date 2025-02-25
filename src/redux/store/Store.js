import {createStore} from 'redux';
import rootReducer from '../reducer/Reducer';
const store = createStore(rootReducer);
export default store;

