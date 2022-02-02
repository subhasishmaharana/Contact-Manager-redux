import React from 'react'
import ContactForm from "./Form"
import {connect} from 'react-redux'
import {startAddContact} from '../actions/contacts'

function ContactNew(props){
    
    const handleSubmit = (formData) => {
        props.dispatch(startAddContact(formData, props))
    }
        return(
            <div className="container mt-5">
                <h2 style={{textAlign:"center"}}>Add New Contact</h2>
                <ContactForm handleSubmit={handleSubmit}/>
            </div>
        )
    }

export default connect()(ContactNew)