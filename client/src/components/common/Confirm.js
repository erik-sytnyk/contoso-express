import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class Confirm extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.action}>Ok</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Confirm.propTypes = {
    action: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool
};

export default Confirm;