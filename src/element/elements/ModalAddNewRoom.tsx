import Modal from "react-bootstrap/Modal";
import {Col, Form, Row} from "react-bootstrap";
import {CustomButton} from "./CustomButton";
import toast, {Toaster} from "react-hot-toast";
import React, {useEffect, useState} from "react";
import {addNewRoom} from "../../service/ApiService";

export const ModalAddNewRoom = (props: AddNewRoomType) => {
    const [show, setShow] = useState(false);
    const [roomTypeId, setRoomTypeId] = useState<string | null>(null);
    const [roomNumber, setRoomNumber] = useState('')
    const [floorNumber, setFloorNumber] = useState('')
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleClose = () => {
        setShow(false)
        props.onClose()
    };
    const createNewRoom = (room: any) => {
        roomTypeId ?
            addNewRoom(room).then((status) => {
                toast(status === 200 ? "Dodano nowy pokój." : 'Wystąpił problem podczas dodawania pokoju.\nSprawdź dane i spróbuj ponowni', {
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
            }) : toast('Wybierz typ pokoju.', {
                style: {
                    borderRadius: '10px',
                    background: '#4D1C61',
                    color: '#fff',
                    textAlign: "center"
                },
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj pokój</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="roomType">
                        <Form.Label>Typ pokoju:</Form.Label>
                        <Form.Select aria-label="roomId" onChange={(e) => {
                            setRoomTypeId(e.target.value)
                        }}>
                            <option></option>
                            {props.roomsType ? props.roomsType.map((roomType: any, index: number) => (
                                <option
                                    key={index}
                                    value={roomType.id}>{roomType.name + ' | Łóżka: ' + roomType.numberOfBeds + ' | Osoby: ' + roomType.numberOfPeople + ' | łazienka: ' + (roomType.bathroom ? 'Tak' : 'Nie') + ' | Balkon: ' + (roomType.balcony ? 'Tak' : 'Nie')} </option>
                            )) : null}
                        </Form.Select>
                    </Form.Group>
                    <div className={'d-flex border-bottom border-black my-3'}></div>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="roomNumber">
                                    <Form.Label>Numer Pokoju</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Numer pokoju"
                                        autoFocus
                                        onChange={(e) => setRoomNumber(e.target.value)}
                                    />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="floor">
                                    <Form.Label>Piętro:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Numer piętra"
                                        onChange={(e) => setFloorNumber(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={'d-flex justify-content-end'}>
                    <CustomButton value={'Dodaj pokój'} onClick={() => {
                        createNewRoom({number: roomNumber, typeId: roomTypeId, floor: floorNumber})
                    }}></CustomButton>
                </Modal.Footer>
            </Modal>
            <Toaster/>
        </>
    );
}

interface AddNewRoomType {
    show: boolean
    onClose: () => void
    roomsType: any
}