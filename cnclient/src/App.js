import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import _ from 'lodash'
import {connect} from 'react-redux'
import swal from 'sweetalert'


import Home from './components/common/Home'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Account from './components/users/Account'
import {startLogoutUser} from './components/actions/users'

import ContactList from './components/contact/List'
import ContactShow from './components/contact/Show'
import ContactNew from './components/contact/New'
import ContactEdit from './components/contact/Edit'

function App(props) {
   const handleLogout = () => {
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Successfully Logged out", {
          icon: "success",
        });               
        props.dispatch(startLogoutUser())
      } 
    })
   
   }
  return (
    <BrowserRouter>
     <div className = "container-fluid">
     <nav className="navbar bg-secondary">
     <a className="navbar-brand " ><Link to="/"  className="nav-link" style={{color:"white"}}>CONTACT MANAGER</Link></a>
      <ul  className="nav justify-content-end">
      <li className="nav-item active " ><Link to = "/" className="nav-link" style={{color:"white"}}>Home</Link></li>
        
        {
          !_.isEmpty(props.user) ?(
            <div className="nav justify-content-end">
              <li className="nav-item"><Link to = "/contacts" className="nav-link" style={{color:"white"}}>Contacts</Link></li>
              <li className="nav-item"><Link to = "/users/account" className="nav-link" style={{color:"white"}}>Account</Link></li>
              <li className="nav-item-active"><Link to ="#" className="nav-link" onClick= {handleLogout} style={{color:"white"}}>Logout</Link></li>
          
            </div>
          ): (
            <div className="nav justify-content-end">
              <li className="nav-item"><Link to = "/users/register" className="nav-link" style={{color:"white"}}>Register</Link></li>
              <li className="nav-item"><Link to = "/users/login" className="nav-link" style={{color:"white"}}>Login</Link></li>
            </div>
             )
          }         
      </ul>
      </nav>

      <Switch>
      <Route path ="/" component = {Home} exact = {true}/>
      <Route path = "/users/register" component = {Register}/>
      <Route path = "/users/login" component = {Login}/>
      <Route path = "/users/account" component = {Account}/>
     

      <Route path = "/contacts" component = {ContactList} exact = {true}/>
      <Route path = "/contacts/new" component = {ContactNew}/>
      <Route path = "/contacts/edit/:id" component = {ContactEdit}/>
      <Route path = "/contacts/:id" component = {ContactShow}/>
     
      </Switch>
    </div>
    </BrowserRouter>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(App)
