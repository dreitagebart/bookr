import React from 'react'
import { Modal, Form } from 'semantic-ui-react'

class ProjectRename extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        title: props.title
      },
      error: false
    }
  }

  onCancel = () => {
    const { title } = this.props

    this.setState({ data: { ...this.state.data, title } })

    this.props.onCancel()
  }

  onConfirm = () => {
    const { data } = this.state

    if (!data.title) return this.setState({ error: true })

    this.props.onConfirm(data)
  }

  onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: [e.target.value] } })

  onSubmit = e => {
    e.preventDefault()

    this.onConfirm()
  }

  render() {
    const { open } = this.props
    const { data, error } = this.state

    return (
      <Modal size="mini" dimmer="blurring" open={open}>
        <Modal.Header>Rename project</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <Form.Input
                placeholder="Project title"
                value={data.title}
                onChange={this.onChange}
                name="title"
                error={error}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions
          actions={[
            {
              key: 'confirm',
              primary: true,
              content: 'rename project',
              icon: 'check',
              onClick: () => this.onConfirm()
            },
            {
              key: 'cancel',
              content: 'Cancel',
              icon: 'close',
              onClick: () => this.onCancel()
            }
          ]}
        />
      </Modal>
    )
  }
}

export default ProjectRename
