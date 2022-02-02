import React from 'react'

export default class ContactForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: props.name ? props.name : '',
            email: props.email ? props.email: '',
            phone: props.phone ? props.phone: '',
            picture: props.picture?props.picture.path: ''
        }
    }

    handleChange=(e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleChangeImage=(e)=>{
        let picture=e.target.files[0]
        console.log(picture)
        this.setState({picture})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let formData=new FormData()
          formData.append('picture', this.state.picture)
          formData.append('email', this.state.email)
          formData.append('phone', this.state.phone)
          formData.append('name', this.state.name)       
        this.props.handleSubmit(formData)
        console.log('form',formData)
        
    }
    
    render(){
        //console.log(this.state)
        return(
            <div className="container mt-5">
                <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label> Name</label>
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" placeholder="name" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label> Email</label>
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label> Phone</label>
                        <input type="text" value={this.state.phone} onChange={this.handleChange} name="phone" placeholder="phone" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>picture</label>
                        <input type="file" onChange={this.handleChangeImage} className="form-control-file" name="picture" placeholder="picture"/>
                    </div>
                    <input type ="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}