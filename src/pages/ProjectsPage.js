import React from 'react'
import { connect } from 'react-redux'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { setProjectModal, setProject } from '../actions/project'
import parseTime from '../utils/parseTime'

class ProjectsPage extends React.Component {
  getTotalBookings = bookings => {
    let totalHours = 0
    let totalMinutes = 0

    // First simply adding all of it together, total hours and total minutes
    for (let i in bookings) {
      const split = bookings[i].value.split(':')

      totalHours += parseInt(split[0], 10)
      totalMinutes += parseInt(split[1], 10)
    }

    // If the minutes exceed 60
    if (totalMinutes >= 60) {
      // Divide minutes by 60 and add result to hours
      totalHours += Math.floor(totalMinutes / 60)
      // Add remainder of totalM / 60 to minutes
      totalMinutes = totalMinutes % 60
    }

    return `${totalHours}:${totalMinutes}`
  }

  onCreateClick = e => {
    e.preventDefault()

    this.props.dispatch(setProjectModal(true))
  }

  onProjectClick = project => {
    this.props.dispatch(setProject(project))

    this.props.history.push(`/project/${project.id}`)
  }

  render() {
    const { projects } = this.props

    return (
      <div>
        <Menu borderless compact>
          <Menu.Item active onClick={this.onCreateClick}>
            <Icon name="plus" /> create new project
          </Menu.Item>
        </Menu>
        <Table selectable singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Total booked</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {!projects.length && (
              <Table.Row>
                <Table.Cell colSpan={2}>No projects yet...</Table.Cell>
              </Table.Row>
            )}
            {projects.length > 0 &&
              projects.map(proj => (
                <Table.Row
                  key={proj.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.onProjectClick(proj)}
                >
                  <Table.Cell>
                    <a>{proj.title}</a>
                  </Table.Cell>
                  <Table.Cell>
                    {proj.bookings ? (
                      parseTime(this.getTotalBookings(proj.bookings), true)
                    ) : (
                      <Icon name="minus" />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default connect(state => ({
  projects: state.root.projects
}))(ProjectsPage)
