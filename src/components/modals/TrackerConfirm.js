import React from 'react'
import { Modal } from 'semantic-ui-react'

class TrackerConfirm extends React.Component {
  onCancel = () => {
    this.props.onCancel()
  }

  onConfirm = () => {
    this.props.onConfirm()
  }

  render() {
    const { isOpen } = this.props

    return (
      <Modal
        size="mini"
        dimmer="blurring"
        open={isOpen}
        onClose={this.props.onClose}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Track time</Modal.Header>
        <Modal.Content>Do you want to add tracking time to project?</Modal.Content>
        <Modal.Actions
          actions={[
            {
              key: 'create',
              primary: true,
              onClick: () => this.onConfirm(),
              icon: 'check',
              content: 'Yes'
            },
            {
              key: 'cancel',
              icon: 'close',
              onClick: () => this.onCancel(),
              content: 'No'
            }
          ]}
        />
      </Modal>
    )
  }
}

export default TrackerConfirm
