import React from 'react'
import { Grid, Container, Button, Segment } from 'semantic-ui-react'

const { ipcRenderer, shell } = window.require('electron')

class ExportPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      successJSON: false,
      successXLSX: false
    }
  }

  exportJSON = () => {
    this.setState({ successJSON: ipcRenderer.sendSync('export-json') })
  }

  exportXLSX = () => {
    this.setState({ successXLSX: ipcRenderer.sendSync('export-xlsx') })
  }

  render() {
    const { successJSON, successXLSX } = this.state

    return (
      <Container>
        <Segment>
          <Grid columns={3}>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={4} textAlign="center">
                <Button
                  icon="file code outline"
                  onClick={() => this.exportJSON()}
                  primary
                  content="Export JSON"
                />
              </Grid.Column>
              <Grid.Column width={12}>
                {successJSON && (
                  <span>
                    <span style={{ marginRight: 10 }}>
                      <Button
                        compact
                        onClick={() => shell.openExternal(successJSON)}
                        icon="file outline"
                        content="open"
                      />
                    </span>
                    JSON file created in <b>{successJSON}</b>
                  </span>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={4} textAlign="center">
                <Button
                  icon="file excel outline"
                  onClick={() => this.exportXLSX()}
                  primary
                  content="Export Excel"
                />
              </Grid.Column>
              <Grid.Column width={12}>
                {successXLSX && (
                  <span>
                    <span style={{ marginRight: 10 }}>
                      <Button
                        compact
                        onClick={() => shell.openExternal(successXLSX)}
                        icon="file outline"
                        content="open"
                      />
                    </span>
                    XLSX file created in <b>{successXLSX}</b>
                  </span>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

export default ExportPage
