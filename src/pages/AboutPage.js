import React from 'react'
import { Grid, Container, Segment, Icon } from 'semantic-ui-react'

const { ipcRenderer } = window.require('electron')

class AboutPage extends React.Component {
  constructor(props) {
    super(props)

    window.title = 'bookr - About'
  }

  render() {
    return (
      <Container style={{ marginTop: '4vh' }}>
        <Grid columns={2}>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={14}>
              <h3 style={{ marginLeft: 10 }}>About this app</h3>
            </Grid.Column>
            <Grid.Column width={2} textAlign="right">
              <span style={{ paddingRight: 10 }}>
                <Icon name="close" size="large" link onClick={() => ipcRenderer.send('close-about')} />
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment>
              <p>This page uses magnificent web technologies like React, Webpack and other stuff.</p>
              <p>React Webpack</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Container>
    )
  }
}

export default AboutPage
