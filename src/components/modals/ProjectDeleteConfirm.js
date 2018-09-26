import React from 'react'
import { Modal } from 'semantic-ui-react'

class ProjectDeleteConfirm extends React.Component {
  render() {
    const { open } = this.props

    return (
      <Modal closeOnDimmerClick size="mini" dimmer="blurring" open={open}>
        <Modal.Header>Confirm deletion</Modal.Header>
        <Modal.Content>Are you sure to delete this project?</Modal.Content>
        <Modal.Actions
          actions={[
            {
              key: 'confirm',
              primary: true,
              content: 'Yes',
              icon: 'check',
              onClick: () => this.props.onConfirm()
            },
            {
              key: 'cancel',
              content: 'Cancel',
              icon: 'close',
              onClick: () => this.props.onCancel()
            }
          ]}
        />
      </Modal>
    )
  }
}

export default ProjectDeleteConfirm
