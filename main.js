import Position from 'electron-positioner'
import isDev from 'electron-is-dev'
import path from 'path'
import crypto from 'crypto'
import { createServer, PORT } from './server'
import { buildExcel } from './utils'
import fs from 'fs'
import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import db from 'electron-settings'
import defaults from './defaults'
import icon from './src/images/icon.png'

if (!isDev) {
  createServer()
}

const appUrl = isDev ? 'http://localhost:3000' : 'http://localhost:' + PORT

const aboutUrl = isDev
  ? 'http://localhost:3000/?startPage=about'
  : 'http://localhost:' + PORT + '/?startPage=about'

let appWindow
let aboutWindow
let tray

const bootstrap = () => {
  createTray()
  createAppWindow()
}

const quitApp = () => {
  if (appWindow) appWindow.close()
  if (aboutWindow) aboutWindow.close()
  tray = null
}

const showAbout = () => {
  appWindow.webContents.send('show-about')
  appWindow.show()
}

const createTray = () => {
  tray = new Tray(nativeImage.createFromDataURL(icon))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Help' },
    // { label: 'About', click: () => createAboutWindow() },
    { label: 'Quit', click: () => quitApp() }
  ])

  tray.setToolTip('bookr App')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    appWindow.show()
  })
}

const createAboutWindow = () => {
  if (aboutWindow) aboutWindow.show()

  aboutWindow = new BrowserWindow({
    show: false,
    maximizable: false,
    center: true,
    frame: false,
    width: 800,
    height: 600,
    title: 'bookr - About'
  })

  aboutWindow.loadURL(aboutUrl)

  if (isDev) {
    aboutWindow.setMaximizable(true)
    aboutWindow.webContents.openDevTools()
    aboutWindow.maximize()
  }

  aboutWindow.on('closed', () => {
    aboutWindow = null
  })

  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}

const createAppWindow = () => {
  appWindow = new BrowserWindow({
    maximizable: true,
    frame: false,
    movable: true,
    show: false,
    minWidth: 800,
    width: 800,
    minHeight: 800,
    height: 1000,
    title: 'bookr'
  })

  // appWindow.webContents.openDevTools()

  const positioner = new Position(appWindow)
  const { x, y } = positioner.calculate('bottomRight')

  appWindow.setPosition(x, y)

  appWindow.loadURL(appUrl)

  appWindow.on('closed', () => {
    appWindow = null
  })

  appWindow.on('maximize', () => {
    appWindow.webContents.send('maximize')
  })

  appWindow.on('unmaximize', () => {
    appWindow.webContents.send('unmaximize')
  })

  appWindow.once('ready-to-show', () => appWindow.show())
}

app.on('ready', () => bootstrap())

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    tray = null
    app.quit()
  }
})

app.on('activate', function() {
  if (appWindow === null) {
    createAppWindow()
  }
})

ipcMain.on('get-hash', (event, args) => {
  const current_date = new Date().valueOf().toString()
  const random = Math.random().toString()

  event.returnValue = crypto
    .createHash('sha1')
    .update(current_date + random)
    .digest('hex')
})

ipcMain.on('hide-app', () => {
  appWindow.hide()
})

ipcMain.on('quit-app', () => {
  quitApp()
})

ipcMain.on('close-about', (e, args) => {
  aboutWindow.close()
})

ipcMain.on('minimize-app', (e, args) => {
  appWindow.minimize()
})

ipcMain.on('maximize-app', (e, args) => {
  appWindow.maximize()
  e.sender.send('maximize')
})

ipcMain.on('unmaximize-app', (e, args) => {
  appWindow.unmaximize()
  e.sender.send('unmaximize')
})

ipcMain.on('close-app', (e, args) => {
  appWindow.hide()
})

ipcMain.on('app-state', (e, args) => {
  e.returnValue = appWindow.isMaximized()
})

ipcMain.on('get-projects', (e, args) => {
  let result = db.get('projects')

  if (!result) {
    result = []
    db.set('projects', result)
  }

  e.returnValue = result
})

ipcMain.on('set-projects', (e, args) => {
  const payload = args

  db.set('projects', payload)
})

ipcMain.on('set-project', (e, args) => {
  const payload = args

  let projects = db.get('projects')

  db.set(
    'projects',
    projects.map(project => {
      if (project.id === payload.id) return payload
      return project
    })
  )
})

ipcMain.on('get-settings', (e, args) => {
  let result = db.get('settings')

  if (!result) result = {}

  if (Object.keys(result).length === 0) {
    result = defaults.settings
    db.set('settings', result)
  }

  appWindow.setAlwaysOnTop(result.alwaysOnTop)

  e.returnValue = result
})

ipcMain.on('set-settings', (e, args) => {
  const payload = args

  appWindow.setAlwaysOnTop(payload.alwaysOnTop)

  db.set('settings', payload)
})

ipcMain.on('export-json', (e, args) => {
  const target = path.join(app.getPath('documents'), 'bookr.json')

  const payload = db.get('projects')

  fs.writeFileSync(target, JSON.stringify(payload, null, 2))

  e.returnValue = target
})

ipcMain.on('export-xlsx', (e, args) => {
  const target = path.join(app.getPath('documents'), 'bookr.xlsx')

  const payload = db.get('projects')

  buildExcel(payload, target)

  e.returnValue = target
})
