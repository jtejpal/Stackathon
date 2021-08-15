// import React from 'react'
// import {connect} from 'react-redux'
// import {authenticate} from '../store'
// import { createCustomerThunk } from '../store/stripe'

// /**
//  * COMPONENT
//  */

// class AuthForm extends React.Component {

//   constructor(){
//     super()
//   }

//   // handleSubmit(evt) {
//   //   evt.preventDefault()
//   //   const formName = evt.target.name
//   //   const username = evt.target.username.value
//   //   const password = evt.target.password.value
//   //   authenticate(username, password, formName)
//   //   if(formName === 'signup') {
//   //     createCustomerThunk()
//   //   }
//   // }
//   render() {
//     return (
//       <div>
//         old form
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     createCustomerThunk: () => dispatch(createCustomerThunk()),
//     authenticate: (username, password, formName) => dispatch(authenticate(username, password, formName)),
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
