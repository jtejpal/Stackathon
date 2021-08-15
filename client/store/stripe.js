import axios from 'axios'
const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
const SET_CUSTOMER = 'SET_CUSTOMER'


const createCustomer = (obj) => {
  return {
    type: CREATE_CUSTOMER,
    obj
  }
}

const setCustomer = (obj) => {
  return {
    type: SET_CUSTOMER,
    obj
  }
}

export const createCustomerThunk = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/stripe/customer', {
        headers: {
          username
        }
      })
      dispatch(createCustomer(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setCustomerThunk = (stripeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/stripe/customer/${stripeId}`)
      dispatch(setCustomer(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function (state = {}, action){
  switch(action.type) {
    case CREATE_CUSTOMER:
      return action.obj
    case SET_CUSTOMER:
      return action.obj
    default:
      return state
  }
}
