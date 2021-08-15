import axios from 'axios'

const CREATE_SUBSCRIPTION = "SET_SUBSCRIPTION"

const createSubscription = (subscription) => {
  return {
    type: CREATE_SUBSCRIPTION,
    subscription
  }
}

export const createStripeSubscriptionThunk = (customerId, priceId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/stripe/subscription', {
        customerId,
        priceId
      })
      dispatch(createSubscription(data))
    } catch (error) {
      console.log(error)
    }
  }
}


export default function(state = {}, action) {
  switch(action.type) {
    case CREATE_SUBSCRIPTION:
      return action.subscription
    default:
      return state
  }
}
