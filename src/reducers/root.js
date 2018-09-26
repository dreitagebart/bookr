import { PROJECTS_RECEIVED } from '../actions/project'

const rootReducer = (
  state = {
    projects: []
  },
  action
) => {
  switch (action.type) {
    case PROJECTS_RECEIVED: {
      return { ...state, projects: action.payload }
    }
    default:
      return state
  }
}

export default rootReducer
