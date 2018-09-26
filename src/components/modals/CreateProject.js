import React from 'react'
import { Modal, Form } from 'semantic-ui-react'
import api from '../../api'

class CreateProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        title: ''
      },
      errors: {}
    }

    this.initialState = this.state
  }

  onSubmit = e => {
    if (e) e.preventDefault()

    const errors = this.validateForm(this.state.data)

    this.setState({ errors })

    if (Object.keys(errors).length === 0) {
      const hash = api.getHash()
      const payload = [...this.props.data]

      payload.push({
        id: hash,
        title: this.state.data.title,
        total: 100
      })
      this.props.onSubmit(payload)
      this.setState(this.initialState)
      this.props.onClose()
    }
  }

  validateForm = data => {
    let errors = {}

    if (!data.title) errors.title = 'Please insert title'

    return errors
  }

  onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })

  render() {
    const { data, errors } = this.state
    const { open } = this.props

    return (
      <Modal
        size="mini"
        closeOnDimmerClick={false}
        open={open}
        dimmer="blurring"
        onClose={() => {
          this.setState(this.initialState)
          this.props.onClose()
        }}
      >
        <Modal.Header>Add new Project</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSubmit}>
            <Form.Input
              focus
              error={!!errors.title}
              value={data.title}
              onChange={this.onChange}
              name="title"
              placeholder={errors.title ? 'please insert a project title' : 'your project title...'}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions
          actions={[
            {
              key: 'create',
              primary: true,
              onClick: () => this.onSubmit(),
              icon: 'plus',
              content: 'Create'
            },
            {
              key: 'cancel',
              icon: 'close',
              onClick: () => {
                this.setState(this.initialState)
                this.props.onClose()
              },
              content: 'Cancel'
            }
          ]}
        />
      </Modal>
    )
  }
}

export default CreateProject
