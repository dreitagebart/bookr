import padStart from 'lodash.padstart'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import ProjectModal from './modals/CreateProject'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Layout from './Layout'
import Tracker from './Tracker'
import ElectronHandler from './ElectronHandler'
import TrackerConfirm from './modals/TrackerConfirm'
import TrackManual from './modals/TrackManual'
import { getProjects, setProjectModal, updateProjects, addBooking } from '../actions/project'
import { track, setTrackerConfirm, setTrackerManual, resetTracker } from '../actions/tracker'
import { getInternalOrders } from '../actions/sap'
import { getSettings } from '../actions/settings'

let tracker = null

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.run && !tracker) {
      tracker = setInterval(() => {
        this.props.dispatch(track())
      }, 1000)
    }
    if (this.props.run && !nextProps.run) {
      clearInterval(tracker)
      tracker = null
    }
  }

  componentWillMount() {
    this.props.dispatch(getProjects())
    this.props.dispatch(getSettings())
    this.props.dispatch(getInternalOrders())
  }

  componentWillUnmount() {
    if (tracker) clearInterval(tracker)
  }

  onTrackerConfirm = () => {
    const { project, track } = this.props

    let oDate = new Date()
    const days = padStart(oDate.getDate(), 2, '0')
    const months = padStart(oDate.getMonth() + 1, 2, '0')
    const years = oDate.getFullYear()
    let hours = oDate.getHours()
    let mins = padStart(oDate.getMinutes(), 2, '0')

    const date = `${days}.${months}.${years}`

    const time = `${hours}:${mins}`

    hours = Math.floor(track / 3600)
    mins = Math.floor((track - hours * 3600) / 60)

    const value = `${hours}:${!mins ? '01' : padStart(mins, 2, '0')}`

    this.props.dispatch(
      addBooking(project.id, {
        date,
        time,
        value
      })
    )
    this.props.dispatch(setTrackerConfirm(false))
    this.props.dispatch(resetTracker())
  }

  render() {
    const { open, projects, confirm, manual } = this.props

    return (
      <Router>
        <Layout>
          <ElectronHandler />
          <TrackManual
            open={manual}
            onConfirm={data => {
              const { currentProject } = this.props

              let oDate = new Date()
              const days = padStart(oDate.getDate(), 2, '0')
              const months = padStart(oDate.getMonth() + 1, 2, '0')
              const years = oDate.getFullYear()
              const date = `${days}.${months}.${years}`
              const hours = oDate.getHours()
              const mins = padStart(oDate.getMinutes(), 2, '0')
              const time = `${hours}:${mins}`

              this.props.dispatch(addBooking(currentProject.id, { date, time, value: data.time }))
              this.props.dispatch(setTrackerManual(false))
            }}
            onCancel={() => {
              this.props.dispatch(setTrackerManual(false))
            }}
          />
          <TrackerConfirm
            isOpen={confirm}
            onConfirm={() => this.onTrackerConfirm()}
            onCancel={() => {
              this.props.dispatch(resetTracker())
              this.props.dispatch(setTrackerConfirm(false))
            }}
          />
          <ProjectModal
            data={projects}
            open={open}
            onClose={() => this.props.dispatch(setProjectModal(false))}
            onSubmit={data => this.props.dispatch(updateProjects(data))}
          />
          <Header />
          <Tracker />
          <Content />
          <Footer />
        </Layout>
      </Router>
    )
  }
}

export default connect(state => ({
  currentProject: state.project.project,
  project: state.tracker.project,
  confirm: state.tracker.confirm,
  manual: state.tracker.manual,
  run: state.tracker.run,
  track: state.tracker.track,
  projects: state.root.projects,
  open: state.project.open
}))(App)
