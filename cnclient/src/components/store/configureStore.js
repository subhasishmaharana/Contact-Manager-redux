import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import contactsReducer from '../reducers/contacts'
import userReducer from '../reducers/users'

const configureStore = () => {
    const store = createStore(combineReducers({
        contacts: contactsReducer,
        user: userReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore