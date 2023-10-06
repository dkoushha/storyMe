import React, { Component } from 'react'
import { Button } from "reactstrap";

import {
  Modal,
  ModalFooter,
} from "reactstrap";


export class ImageUpload extends Component {
  state = {
    modalOpen: false

  }

  fileInput = React.createRef();

  handleClick = () => {
    this.fileInput.current.click();
  };

  handelRemove = () => {
    this.setState({ modalOpen: false });
    this.props.handleImageRemove()
    this.fileInput.current.value = null;

  }

  render() {
    return (
      <div className="fileinput text-center" style={{ width: '100%' }}>
        <input type="file" name="imageUrl" onChange={(e) => this.props.handleImageChange(e)} ref={this.fileInput} />
        <div
          className={
            "fileinput-new thumbnail img-raised" +
            (this.props.avatar ? " img-circle" : "")
          }
        >
          <img src={this.props.imageUrl} alt="" />
        </div>
        <div className='btn-block justify-content-center'>
          <Modal
            modalClassName="modal-mini modal-warning"
            isOpen={this.state.modalOpen}
            toggle={() => this.setState({ modalOpen: false })}
          >
            <div className="modal-header justify-content-center">
              {/* <div className="modal-profile"> */}
              <i className="fas fa-minus-circle fa-3x"></i>
              {/* </div> */}
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the image?</p>
            </div>
            <ModalFooter>
              <Button className="btn-neutral" color="neutral" onClick={this.handelRemove}>
                Delete
              </Button>
              <Button
                className="btn-neutral"
                color="neutral"
                onClick={() => this.setState({ modalOpen: false })}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ImageUpload;




