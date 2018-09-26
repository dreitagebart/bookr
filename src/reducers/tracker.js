import {
  TRACK,
  TRACK_CONFIRM,
  TRACK_MANUAL,
  TRACK_START,
  TRACK_PAUSE,
  TRACK_STOP,
  TRACK_RESET
} from '../actions/tracker'

const trackerReducer = (
  state = {
    confirm: false,
    project: null,
    manual: false,
    track: 9720,
    run: false,
    show: false
  },
  action
) => {
  switch (action.type) {
    case TRACK: {
      return { ...state, run: true, track: state.track + 1 }
    }
    case TRACK_CONFIRM: {
      return { ...state, confirm: action.payload }
    }
    case TRACK_MANUAL: {
      return { ...state, manual: action.payload }
    }
    case TRACK_START: {
      return { ...state, run: true, show: true, project: action.payload }
    }
    case TRACK_PAUSE: {
      return { ...state, run: false, show: true }
    }
    case TRACK_STOP: {
      return { ...state, run: false, show: false }
    }
    case TRACK_RESET: {
      return { ...state, run: false, show: false, track: 0 }
    }
    default:
      return state
  }
}

export default trackerReducer
