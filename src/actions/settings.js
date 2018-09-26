import api from '../api'

export const SETTINGS_RECEIVED = 'SETTINGS_RECEIVED'

export const settingsReceived = settings => ({
  type: SETTINGS_RECEIVED,
  payload: settings
})

export const getSettings = () => dispatch => {
  const data = api.settings.getAll()
  dispatch(settingsReceived(data))
}

export const saveSettings = settings => dispatch => {
  api.settings.setAll(settings)
  dispatch(settingsReceived(settings))
}
