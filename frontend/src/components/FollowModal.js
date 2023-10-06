import React from 'react';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import {
    Button,
    Modal,
    ModalFooter,
    Container,
    Row,
    Col,
    Card
} from "reactstrap";

const FollowModal = (props) => {
    return (
        <div >
            <Container>
                <Row id="modals">
                    <Col md="6">
                        <Modal
                            className="modal-login"
                            modalClassName=" modal-info"
                            isOpen={props.isClickedFollow}
                            toggle={() => props.setIsClickedFollow(false)}
                        >
                            <Card
                                className="card-login card-plain"
                                data-background-color=""
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        aria-hidden={true}
                                        className="close"
                                        onClick={() => props.setIsClickedFollow(false)}
                                        type="button"
                                    >
                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </button>
                                    <div className="header header-info text-center">
                                        <div className="logo-container">
                                            <IconContext.Provider value={{ size: "2em" }}><BsFillPersonPlusFill /></IconContext.Provider>                                        </div>
                                    </div>
                                </div>
                                {props.data.map((follower) => {
                                    return (<div className="modal-body modal-flex" style={{ textAlign: 'center' }} key={follower._id}>
                                        <img src={follower.image} alt='...' className='follower-image' />

                                        <h3 onClick={() => {
                                            props.changeStateHandler(follower._id);
                                            props.setIsClickedFollow(false)
                                        }}
                                            style={{ cursor: 'pointer' }}
                                        >{follower.userName}</h3>
                                    </div>)
                                })}
                                <ModalFooter>
                                    <Button
                                        className="btn-neutral"
                                        color="neutral"
                                        onClick={() => props.setIsClickedFollow(false)}
                                    >
                                        OK
                                            </Button>
                                </ModalFooter>
                            </Card>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default FollowModal;

