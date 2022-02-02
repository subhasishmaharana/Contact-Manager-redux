import React from 'react'
import {startResgisterUser} from '../actions/users'
import {connect} from 'react-redux'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            email: '',
            password: ''
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password : this.state.password
        }
        this.props.dispatch(startResgisterUser(formData, this.props))
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        return(
            <div className="container">
                <br/>
                <h2 style={{textAlign:"center"}}>Register</h2>
                <form onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type = "text" value={this.state.username} onChange={this.handleChange} name="username" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label> Email</label>
                        <input type = "text" value={this.state.email} onChange={this.handleChange} name="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type = "password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control"/>
                    </div>
                    <input type = "submit" className="btn btn-primary" />
                    
                </form>
            </div>
        )
    }
}
export default connect()(Register)