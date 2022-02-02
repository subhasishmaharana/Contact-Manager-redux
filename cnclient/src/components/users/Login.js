import React from 'react'
import {connect} from 'react-redux'
import {startLoginUser} from '../actions/users'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password : this.state.password
        }
        this.props.dispatch(startLoginUser(formData, this.props))
       
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
                <h2 style={{textAlign:"center"}}>Login</h2>
                <form onSubmit = {this.handleSubmit}>
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
export default connect()(Login)