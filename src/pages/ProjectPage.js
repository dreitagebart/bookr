import find from 'lodash.find'
import React from 'react'
import { connect } from 'react-redux'
import { Button, Popup, Table, Icon, Menu, Dropdown, Message } from 'semantic-ui-react'
import {
  updateBooking,
  deleteBooking,
  setProjectDelete,
  setProjectRename,
  updateProject,
  updateProjects
} from '../actions/project'
import { startTracker, stopTracker, pauseTracker, setTrackerManual } from '../actions/tracker'
import parseTime from '../utils/parseTime'
import timeOptions from '../utils/timeOptions'
import ProjectRename from '../components/modals/ProjectRename'
import ConfirmDelete from '../components/modals/ProjectDeleteConfirm'

class ProjectPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      error: false,
      cellId: null,
      cellValue: ''
    }
  }

  onCellChange = (e, data) => {
    this.setState({ cellValue: e.target.value })
  }

  onCellSelect = (e, data) => {
    if (e.type === 'click' || e.key === 'Enter') {
      this.props.dispatch(updateBooking(this.props.project.id, this.state.cellId, data.value))
      this.setState({ edit: false, cellId: null, cellValue: '' })
      return
    }
    this.setState({ cellValue: data.value })
  }

  onCellLeave = e => {
    let error = false

    this.setState({
      edit: false,
      cellId: null,
      error,
      cellValue: ''
    })
  }

  editCell = cellId => {
    if (this.state.edit) return
    const { project } = this.props

    const { value } = project.bookings.find(b => b.id === cellId)

    this.setState({ edit: true, cellId, cellValue: value })
  }

  confirmDelete = () => {
    const { projects, project } = this.props

    const payload = projects.filter(p => p.id !== project.id)
    this.props.history.push('/projects')
    this.props.dispatch(updateProjects(payload))
    this.props.dispatch(setProjectDelete(false))
  }

  render() {
    const { project, run, track, rename, confirm } = this.props
    const { cellId, cellValue, edit, error } = this.state

    return (
      <div>
        <ProjectRename
          title={project.title}
          open={rename}
          onConfirm={data => {
            const payload = { ...project, title: data.title }
            this.props.dispatch(updateProject(payload))
            this.props.dispatch(setProjectRename(false))
          }}
          onCancel={() => this.props.dispatch(setProjectRename(false))}
        />
        <ConfirmDelete
          open={confirm}
          onConfirm={() => this.confirmDelete()}
          onCancel={() => this.props.dispatch(setProjectDelete(false))}
        />
        <Menu secondary pointing>
          <Menu.Item active onClick={() => this.props.history.goBack()}>
            <h3>
              <Icon name="chevron left" /> {project.title}
            </h3>
          </Menu.Item>
          <Dropdown item icon="chevron down">
            <Dropdown.Menu>
              <Dropdown.Item
                text="rename"
                onClick={() => this.props.dispatch(setProjectRename(true))}
              />
              <Dropdown.Item
                text="delete"
                onClick={() => this.props.dispatch(setProjectDelete(true))}
              />
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position="right">
            <Menu.Item>
              <Popup
                className="tooltip"
                position="top center"
                trigger={
                  <Button.Group icon>
                    <Button
                      icon="plus"
                      onClick={() => this.props.dispatch(setTrackerManual(true))}
                    />
                  </Button.Group>
                }
                content="manual booking"
                inverted
              />
            </Menu.Item>
            <Menu.Item>
              <Button.Group icon>
                {!run ? (
                  <Popup
                    className="tooltip"
                    position="top center"
                    trigger={
                      <Button
                        icon="play"
                        primary={run}
                        onClick={() => this.props.dispatch(startTracker(project))}
                      />
                    }
                    content="play"
                    inverted
                  />
                ) : (
                  <Popup
                    className="tooltip"
                    position="top center"
                    trigger={
                      <Button
                        icon="pause"
                        primary={!run}
                        onClick={() => this.props.dispatch(pauseTracker())}
                      />
                    }
                    content="pause"
                    inverted
                  />
                )}
                {track !== 0 && (
                  <Popup
                    className="tooltip"
                    position="top center"
                    trigger={
                      <Button icon="stop" onClick={() => this.props.dispatch(stopTracker())} />
                    }
                    content="stop"
                    inverted
                  />
                )}
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Table selectable singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon name="calendar outline" /> date and time
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon name="pencil" /> booked
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {project.bookings ? (
              project.bookings.map(booking => (
                <Table.Row key={booking.id}>
                  <Table.Cell>
                    <span style={{ marginRight: 10 }}>{booking.date}</span>
                    <span>{booking.time}</span>
                  </Table.Cell>
                  <Table.Cell onClick={() => this.editCell(booking.id)}>
                    {edit && booking.id === cellId ? (
                      <Dropdown
                        defaultOpen
                        placeholder="Select time"
                        onBlur={this.onCellLeave}
                        onChange={this.onCellSelect}
                        onSearchChange={this.onCellChange}
                        fluid
                        search
                        selection
                        options={timeOptions}
                        value={cellValue}
                        error={error}
                      />
                    ) : (
                      <span style={{ cursor: 'pointer' }}>{parseTime(booking.value)}</span>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Icon
                      link
                      name="close"
                      onClick={() => this.props.dispatch(deleteBooking(project.id, booking.id))}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={3}>
                  <Message icon="book" header="There are no bookings yet..." />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default connect((state, props) => {
  return {
    projects: state.root.projects,
    run: state.tracker.run,
    track: state.tracker.track,
    rename: state.project.rename,
    confirm: state.project.confirmDelete,
    project: state.project.project || find(state.root.projects, { id: props.match.params.id })
  }
})(ProjectPage)
