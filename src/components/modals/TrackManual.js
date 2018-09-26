import React from 'react'
import { Modal, Form } from 'semantic-ui-react'
import timeOptions from '../../utils/timeOptions'

class TrackManual extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        time: ''
      },
      error: false
    }
  }

  onConfirm = () => {
    this.setState({ data: { ...this.state.data, time: '' } })
    this.props.onConfirm(this.state.data)
  }

  onCancel = () => {
    this.setState({ data: { ...this.state.data, time: '' } })
    this.props.onCancel()
  }

  onChange = (e, data) => {
    this.setState({ data: { ...this.state.data, time: data.value } })
  }

  render() {
    const { data, error } = this.state
    const { open } = this.props

    return (
      <Modal open={open} dimmer="blurring" size="mini">
        <Modal.Header>Track time manually</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Dropdown
                placeholder="Select time"
                width={10}
                onChange={this.onChange}
                fluid
                search
                selection
                options={timeOptions}
                value={data.time}
                error={error}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions
          actions={[
            {
              key: 'yes',
              icon: 'plus',
              content: 'Add time',
              primary: true,
              onClick: this.onConfirm
            },
            { key: 'no', icon: 'close', content: 'Cancel', onClick: this.onCancel }
          ]}
        />
      </Modal>
    )
  }
}

export default TrackManual
