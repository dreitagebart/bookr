import React from 'react'
import { withRouter } from 'react-router-dom'

const { ipcRenderer } = window.require('electron')

class ElectronHandler extends React.Component {
  componentWillMount() {
    ipcRenderer.on('show-about', (e, args) => {
      this.props.history.push('/about')
    })
  }

  render() {
    return null
  }
}

export default withRouter(ElectronHandler)
