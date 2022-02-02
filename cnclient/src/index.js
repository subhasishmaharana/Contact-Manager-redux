import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App';

import 'bootstrap/dist/css/bootstrap.css'

import configureStore from './components/store/configureStore'

import {startSetContacts} from './components/actions/contacts'
import {startGetUser} from './components/actions/users'



const store = configureStore()

console.log(store.getState())
store.subscribe(() => {
    console.log(store.getState())
})

if(localStorage.getItem('authToken')) {
    store.dispatch(startSetContacts())
    store.dispatch(startGetUser())

}
const ele = (

    <Provider store = {store}>
        <App/>
    </Provider>

)

ReactDOM.render(ele, document.getElementById('root'));