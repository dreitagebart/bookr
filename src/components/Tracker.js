import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Popup, Statistic, Icon, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { pauseTracker, startTracker } from '../actions/tracker'
import { setProject } from '../actions/project'
import renderTime from '../utils/renderTime'

class Tracker extends React.Component {
  onProjectClick = e => {
    const { project } = this.props

    e.preventDefault()
    this.props.dispatch(setProject(null))
    this.props.history.push(`/project/${project.id}`)
  }

  render() {
    const { run, project, show, track } = this.props

    const time = renderTime(track)

    let className = 'tracker'

    if (show) {
      className += ' open'
    } else {
      return <div className={className} />
    }

    return (
      <div className={className}>
        <Container style={{ marginTop: 10, marginBottom: 20 }} textAlign="center">
          <Popup
            className="tooltip"
            position="top center"
            trigger={
              <h3>
                <a style={{ cursor: 'pointer', paddingBottom: 8 }} onClick={this.onProjectClick}>
                  Project {project.title}
                </a>
              </h3>
            }
            content="go to this project"
            inverted
          />
          <Button
            size="big"
            onClick={() => {
              if (run) return this.props.dispatch(pauseTracker())
              this.props.dispatch(startTracker(project))
            }}
          >
            <Statistic>
              <Statistic.Value>
                <Icon name="clock outline" />
                <span style={{ marginLeft: 10 }}>{time}</span>
              </Statistic.Value>
              <Statistic.Label style={{ marginTop: 10 }}>TRACK TIME</Statistic.Label>
            </Statistic>
          </Button>
        </Container>
      </div>
    )
  }
}

export default withRouter(
  connect(state => ({
    project: state.tracker.project,
    show: state.tracker.show,
    run: state.tracker.run,
    track: state.tracker.track
  }))(Tracker)
)
