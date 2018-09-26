import { padStart } from 'lodash'
import { TRACK_STOP, setTrackerConfirm, resetTracker } from '../actions/tracker'
import { addBooking } from '../actions/project'

const projectMiddleware = store => next => action => {
  switch (action.type) {
    case TRACK_STOP: {
      next(action)

      if (store.getState().settings.askAfterStop) return store.dispatch(setTrackerConfirm(true))

      const { project, tracker } = store.getState()

      let oDate = new Date()
      const days = padStart(oDate.getDate(), 2, '0')
      const months = padStart(oDate.getMonth() + 1, 2, '0')
      const years = oDate.getFullYear()
      let hours = oDate.getHours()
      let mins = padStart(oDate.getMinutes(), 2, '0')

      const date = `${days}.${months}.${years}`

      const time = `${hours}:${mins}`

      hours = Math.floor(tracker.track / 3600)
      mins = Math.floor(tracker.track / 60)

      const value = `${hours}:${!mins ? '01' : padStart(mins, 2, '0')}`

      store.dispatch(
        addBooking(project.project.id, {
          date,
          time,
          value
        })
      )

      store.dispatch(resetTracker())
      break
    }
    default:
      next(action)
  }
}

export default projectMiddleware
