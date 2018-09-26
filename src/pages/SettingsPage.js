import React from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveSettings } from '../actions/settings'

class SettingsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        askAfterStop: props.settings.askAfterStop,
        sapIntegration: props.settings.sapIntegration,
        alwaysOnTop: props.settings.alwaysOnTop,
        fullName: props.settings.fullName,
        employeeID: props.settings.employeeID,
        entryProfile: props.settings.entryProfile
      },
      errors: {}
    }
  }

  onCheck = (e, data) => {
    const payload = { data: { ...this.state.data, [data.name]: data.checked } }

    this.setState(payload)
    this.save(payload.data)
  }

  onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })

  onSubmit = e => {
    e.preventDefault()
    this.save(this.state.data)
  }

  save = data => {
    console.log('save data:', data)
    this.props.dispatch(saveSettings(data))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.settings })
  }

  onBlur = () => this.save(this.state.data)

  render() {
    const { data } = this.state

    return (
      <div>
        <h3>General Settings</h3>
        <p>Please maintain your settings for better user experience of bookr app.</p>
        <Form onSubmit={this.onSubmit}>
          <h3>Behaviour</h3>
          <Form.Field>
            <Form.Checkbox
              checked={data.askAfterStop}
              onChange={this.onCheck}
              name="askAfterStop"
              label="Ask user for confirmation of time booking after user hit stop button"
            />
          </Form.Field>
          <h3>Appearance</h3>
          <Form.Field>
            <Form.Checkbox
              checked={data.alwaysOnTop}
              onChange={this.onCheck}
              label="Show bookr App always on top"
              name="alwaysOnTop"
            />
          </Form.Field>
          <h3>User information</h3>
          <Form.Field>
            <Form.Input
              width={6}
              name="fullName"
              label="First- and Lastname"
              placeholder="e. g. Dimebag Darrell"
              value={data.fullName}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              width={3}
              name="employeeID"
              label="Employee ID"
              type="number"
              placeholder="e. g. 11765"
              value={data.employeeID}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
          </Form.Field>
          <h3>SAP Integration (not yet supported)</h3>
          <Form.Field>
            <Form.Checkbox
              name="sapIntegration"
              checked={data.sapIntegration}
              label="enable SAP integration"
              onChange={this.onCheck}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              width={3}
              placeholder="e. g. ZW01"
              name="entryProfile"
              label="Data entry profile"
              value={data.entryProfile}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
          </Form.Field>
          {/* <Form.Field>
            <Form.Button icon="save" content="Save" primary />
          </Form.Field> */}
        </Form>
      </div>
    )
  }
}

export default connect(state => ({
  settings: state.settings
}))(SettingsPage)
