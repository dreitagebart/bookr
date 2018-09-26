import React from 'react'
import { Icon, Container, Divider } from 'semantic-ui-react'

const { shell } = window.require('electron')

class Footer extends React.Component {
  onDTBClick = e => {
    e.preventDefault()

    shell.openExternal('http://www.mindreport.com')
  }

  render() {
    return (
      <Container textAlign="center" className="appFooter" fluid>
        <Divider />
        <Icon name="code" color="grey" /> with <Icon name="heart" color="red" /> by{' '}
        <a href="http://www.mindreport.com" onClick={this.onDTBClick}>
          <b>dreitagebart</b>
        </a>
      </Container>
    )
  }
}

export default Footer
