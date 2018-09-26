import { IO_RECEIVED } from '../actions/sap'

const sap = (
  state = {
    orders: []
  },
  action
) => {
  switch (action.type) {
    case IO_RECEIVED: {
      return { ...state, orders: action.payload }
    }
    default:
      return state
  }
}
