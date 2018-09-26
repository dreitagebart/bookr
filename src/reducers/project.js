import { PROJECT_SET, PROJECT_MODAL, PROJECT_RENAME, PROJECT_DELETE } from '../actions/project'

const projectReducer = (
  state = {
    confirmDelete: false,
    open: false,
    project: null,
    rename: false
  },
  action
) => {
  switch (action.type) {
    case PROJECT_DELETE: {
      return { ...state, confirmDelete: action.payload }
    }
    case PROJECT_RENAME: {
      return { ...state, rename: action.payload }
    }
    case PROJECT_MODAL: {
      return { ...state, open: action.payload }
    }
    case PROJECT_SET: {
      return { ...state, project: action.payload }
    }
    default:
      return state
  }
}

export default projectReducer
