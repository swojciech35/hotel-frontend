import Modal from "react-bootstrap/Modal";
import {Col, Form, Image, Row} from "react-bootstrap";
import {CustomButton} from "./CustomButton";
import toast, {Toaster} from "react-hot-toast";
import React, {useEffect, useState} from "react";
import {addNewRoomType} from "../../service/ApiService";

export const ModalAddNewRoomType = (props: AddRoomType) => {
    const [show, setShow] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState('')
    const [numberOfBeds, setNumberOfBeds] = useState('')
    const [name, setName] = useState('')
    const [bathroom, setBathroom] = useState(false)
    const [balcony, setBalcony] = useState(false)
    const [price, setPrice] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleClose = () => {
        setShow(false)
        props.onClose()
    };
    const createNewRoomType = (roomType: any) => {
        addNewRoomType(roomType).then((status) => {
            toast(status === 200 ? "Dodano nowy typ pokój." : 'Wystąpił problem podczas dodawania nowego typu pokoju.\nSprawdź dane i spróbuj ponownie', {
                style: {
                    borderRadius: '10px',
                    background: '#4D1C61',
                    color: '#fff',
                    textAlign: "center"
                },
            })
            if (status === 200) {
                setTimeout(() => {
                    window.location.reload()
                }, 1300)
            }
        })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj rodzaj pokoju </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className={'pb-3'} controlId="name">
                            <Form.Label>Nazwa:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nazwa"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <div className={'d-flex border-bottom border-black mb-3'}></div>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="numberOfPeople">
                                    <Form.Label>Ilość osób:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ilość osób"
                                        autoFocus
                                        onChange={(e) => setNumberOfPeople(e.target.value)}
                                    />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="numberOfBeds">
                                    <Form.Label>Łóżka:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ilość łóżek"
                                        onChange={(e) => setNumberOfBeds(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className={'d-flex border-bottom border-black my-3'}></div>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="bathroom">
                                    <Form.Check
                                        type="checkbox"
                                        label="Łazienka"
                                        checked={bathroom}
                                        onChange={() => setBathroom(!bathroom)}
                                    />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="balcony">
                                    <Form.Check
                                        type="checkbox"
                                        label="Balkon"
                                        checked={balcony}
                                        onChange={() => setBalcony(!balcony)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className={'d-flex border-bottom border-black my-3'}></div>
                        <Form.Group className={'pb-3'} controlId="price">
                            <Form.Label>Cena/dzień:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cena/dzień"
                                autoFocus
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <div className={'d-flex border-bottom border-black my-3'}></div>
                        <Form.Label>Zdjęcie:</Form.Label>
                        <Row className=" d-flex align-items-center  mb-3">
                            <Col>
                                <Form.Group controlId="photo">

                                    <Form.Control
                                        type="text"
                                        placeholder="Link do zdjęcia"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Image className="img-fluid rounded-4"
                                       src={photoUrl}
                                       thumbnail/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={'d-flex justify-content-end'}>
                    <CustomButton value={'Dodaj typ pokoju'} onClick={() => {
                        createNewRoomType({name: name, numberOfPeople: numberOfPeople, numberOfBeds: numberOfBeds, bathroom: bathroom, balcony: balcony, pricePerDay: price, photoUrl: photoUrl})
                    }}></CustomButton>
                </Modal.Footer>
            </Modal>
            <Toaster/>
        </>
    );
}

interface AddRoomType {
    show: boolean
    onClose: () => void
}