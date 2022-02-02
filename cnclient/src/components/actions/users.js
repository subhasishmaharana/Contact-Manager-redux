import axios from 'axios'
import {setContacts} from './contacts'
import swal from 'sweetalert'

export const setUser = (user = {}) => {
    return {
        type:'SET_USER',
        payload: user
    }
}

export const startResgisterUser =(formData, props)=>{
    return (dispatch) => {
        axios.post('http://localhost:3099/users/register', formData)
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    swal(response.data.message)
                }
                else{
                    swal('successfully registered')
                    //redirect user to another page automatically
                    dispatch(setUser())
                   props.history.push('/users/login')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startLoginUser = (formData, props) => {
    return (dispatch) => {
        axios.post('http://localhost:3099/users/login', formData)
            .then((response) => {
                if(!response.data.token){
                    swal(response.data)
                }
                else{
                    console.log(response.data)
                    const token = response.data.token
                    localStorage.setItem('authToken', token)
                    swal('Succssfully logged in')

                    Promise.all([axios.get('http://localhost:3099/users/account',{
                        header: {
                            'x-auth' : token
                        }
                    }), axios.get('http://localhost:3099/contacts', {
                        headers: {
                            'x-auth' : token
                        }
                    })])

                    .then(values => {
                        const [userResponse, ContactsResponse] = values
                        dispatch(setUser(userResponse.data))
                        dispatch(setContacts(ContactsResponse.data))
                        props.history.push('/')
                    })
                    // this.props.history.push('/')
                    // window.location.reload()

                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startGetUser = () =>{
    return(dispatch) =>{
        axios.get('http://localhost:3099/users/account',{
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            const user = response.data
            dispatch(setUser(user))
        })
    }
}

export const startLogoutUser = () => {
    return (dispatch) => {
        axios.delete('http://localhost:3099/users/logout', {
            headers: {
              'x-auth': localStorage.getItem('authToken')
            }
          })
          .then(response =>{
            if(response.data.error){
                swal(response.data.error)
            }
            else{
              localStorage.removeItem('authToken')
              dispatch(setUser({}))
              window.location.href = '/users/login'
            }
          })
    }
}
