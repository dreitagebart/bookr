import React from 'react'
import { Menu, Container, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const { ipcRenderer } = window.require('electron')

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = { activeItem: 'projects', maximized: true }
  }

  componentDidMount() {
    const isMaximized = ipcRenderer.sendSync('app-state')

    this.setState({ maximized: isMaximized })

    ipcRenderer.on('maximize', () => {
      this.setState({ maximized: true })
    })

    ipcRenderer.on('unmaximize', () => {
      this.setState({ maximized: false })
    })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(`/${name}`)
  }

  render() {
    const { activeItem, maximized } = this.state

    return (
      <Container
        style={{ marginTop: 0, marginBottom: 20, backgroundColor: '#efefef' }}
        className="draggable appHeader"
        fluid
      >
        <Menu pointing secondary>
          <Menu.Item>
            <Icon name="book" />
            bookr
          </Menu.Item>
          <Menu.Item
            className="nonDraggable"
            name="projects"
            active={activeItem === 'projects'}
            onClick={this.handleItemClick}
          >
            <Icon name="edit" /> Projects
          </Menu.Item>
          <Menu.Item
            className="nonDraggable"
            name="export"
            active={activeItem === 'export'}
            onClick={this.handleItemClick}
          >
            <Icon name="share alternate" /> Export
          </Menu.Item>
          <Menu.Item
            className="nonDraggable"
            name="settings"
            active={activeItem === 'settings'}
            onClick={this.handleItemClick}
          >
            <Icon name="cog" /> Settings
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item className="nonDraggable">
              <Icon name="window minimize" link onClick={() => ipcRenderer.send('minimize-app')} />
            </Menu.Item>
            <Menu.Item className="nonDraggable">
              {maximized ? (
                <Icon
                  name="window restore outline"
                  link
                  onClick={() => ipcRenderer.send('unmaximize-app')}
                />
              ) : (
                <Icon
                  name="window maximize outline"
                  link
                  onClick={() => ipcRenderer.send('maximize-app')}
                />
              )}
            </Menu.Item>
            <Menu.Item className="nonDraggable">
              <Icon link onClick={() => ipcRenderer.send('close-app')} name="close" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}

export default withRouter(Header)
