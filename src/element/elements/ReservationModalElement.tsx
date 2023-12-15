import Modal from 'react-bootstrap/Modal';
import {Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {CustomButton} from "./CustomButton";
import {LuBedSingle} from "react-icons/lu";
import {MdPerson} from "react-icons/md";
import toast, {Toaster} from "react-hot-toast";

export const ReservationModalElement = (props: ModalType) => {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    useEffect(() => {
        setShow(props.show);
        setStartDate('')
        setEndDate('')
    }, [props.show]);

    const handleClose = () => {
        setShow(false)
        props.onClose()
    };
    const reservationDaysCalculate = () => {
        const timeStartDate = new Date(startDate).getTime();
        const timeEndDate = new Date(endDate).getTime();
        return (timeEndDate - timeStartDate) / (1000 * 3600 * 24)
    }

    const handleSetEndDate = (endDate: string) => {
        const timeStartDate = new Date(startDate).getTime();
        const timeEndDate = new Date(endDate).getTime();
        if (timeStartDate < timeEndDate) {
            setEndDate(endDate)
        } else {
            toast("Data zakończenia musi być późniejsza \n niż data rozpoczęcia rezerwacji", {
                style: {
                    borderRadius: '10px',
                    background: '#4D1C61',
                    color: '#fff',
                    textAlign: "center"
                },
            })
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Rezerwacja pokoju {props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'d-flex flex-row justify-content-evenly '} style={{width: '100%'}}>
                        <div className={'d-flex align-items-center'}>
                            <LuBedSingle size={30} className={'me-2'}/>
                            <strong>{props.numberOfBeds}</strong></div>
                        <div className={'d-flex align-items-center'}>
                            <MdPerson size={30} className={'me-2'}/>
                            <strong>{props.numberOfPeople}</strong></div>
                    </div>
                    <div className={'d-flex border-bottom border-black my-3'}></div>
                    <Form>
                        <div className={'d-flex flex-row justify-content-between'}>
                            <strong>Termin rezerwacji:</strong>
                        </div>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="dayFrom">
                                    <Form.Label>Od</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Od"
                                        autoFocus
                                        onChange={e => {
                                            setStartDate(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="dayTo">
                                    <Form.Label>Do</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Do"

                                        onChange={e => {
                                            handleSetEndDate(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={'d-flex justify-content-between'}>
                    <h5>Wynajem na {reservationDaysCalculate() ? reservationDaysCalculate() : 0} dni
                        {reservationDaysCalculate() ? ' (' + props.pricePerDay * reservationDaysCalculate() + ' zł)' : null}</h5>
                    {reservationDaysCalculate() > 0 ? <CustomButton value={'Zarezerwuj'}></CustomButton> : null}
                </Modal.Footer>
            </Modal>
            <Toaster/>
        </>
    );
};
interface ModalType {
    show: boolean
    name: string
    onClose: () => void
    pricePerDay: number
    numberOfBeds: number
    numberOfPeople: number
}