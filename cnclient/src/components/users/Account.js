import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

class Account extends React.Component{
   
    render(){
        return(
           <div>
                {
                !_.isEmpty(this.props.account) &&(
                    <div class="card text-center">
                
            <div class="card-header">
             ACCOUNT
            </div>
            <div className="card-body">
              <h5 className="card-title">{this.props.account.username}</h5>
              <p className="card-text">{this.props.account.email}</p>
              <a href="/" class="btn btn-primary">Go To Home</a>
            </div>
            <div className="card-footer text-muted">
            Contact Manager - Save All Your Contacts
            </div>
            </div>
                    
                )
            }
           </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account : state.user
    }
}

export default connect(mapStateToProps)(Account)