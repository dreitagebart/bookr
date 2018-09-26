import express from 'express'
import path from 'path'
import isDev from 'electron-is-dev'
import { check } from './utils'

export const PORT = 9999

const staticPath = path.join(__dirname)
const indexPath = path.join(__dirname, 'index.html')
console.log('staticPath', staticPath)
console.log('indexPath', indexPath)
console.log('isDev', isDev)

let server = null

export const createServer = () => {
  check(PORT, (error, inUse) => {
    if (error) return
    if (inUse) return
    server = express()

    server.use('/', express.static(staticPath))

    server.get('/', (req, res) => {
      res.sendFile(indexPath)
    })

    server.listen(PORT, () => {
      console.log('server running on http://localhost:' + PORT)
    })
  })
}
