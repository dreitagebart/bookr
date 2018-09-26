import { get } from 'axios'

const ipc = window.require('electron').ipcRenderer

const api = {
  getHash: () => ipc.sendSync('get-hash'),
  sap: {
    getInternalOrders: () =>
      get('http://api.icndb.com/jokes/random?firstName=Chuck&lastName=Norris').then(
        response => response.data
      )
  },
  project: {
    getAll: () => ipc.sendSync('get-projects'),
    setAll: projects => ipc.send('set-projects', projects),
    set: project => ipc.send('set-project', project)
  },
  settings: {
    getAll: () => ipc.sendSync('get-settings'),
    setAll: settings => ipc.send('set-settings', settings)
  }
}

export default api
