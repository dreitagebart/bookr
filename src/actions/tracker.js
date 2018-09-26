export const TRACK_START = 'TRACK_START'
export const TRACK_RESET = 'TRACK_RESET'
export const TRACK_STOP = 'TRACK_STOP'
export const TRACK_PAUSE = 'TRACK_PAUSE'
export const TRACK_CONFIRM = 'TRACK_CONFIRMED'
export const TRACK_MANUAL = 'TRACK_MANUAL'
export const TRACK = 'TRACK'

export const track = () => ({
  type: TRACK
})

export const startTracker = project => ({
  type: TRACK_START,
  payload: project
})

export const resetTracker = () => ({
  type: TRACK_RESET
})

export const pauseTracker = () => ({
  type: TRACK_PAUSE
})

export const stopTracker = () => ({
  type: TRACK_STOP
})

export const setTrackerConfirm = boolean => ({
  type: TRACK_CONFIRM,
  payload: boolean
})

export const setTrackerManual = boolean => ({
  type: TRACK_MANUAL,
  payload: boolean
})
