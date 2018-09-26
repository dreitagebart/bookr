import { SETTINGS_RECEIVED } from '../actions/settings'

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case SETTINGS_RECEIVED: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

export default settingsReducer
