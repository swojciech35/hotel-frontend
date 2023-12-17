import Modal from 'react-bootstrap/Modal';
import {Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {CustomButton} from "./CustomButton";
import {LuBedSingle} from "react-icons/lu";
import {MdPerson} from "react-icons/md";
import toast, {Toaster} from "react-hot-toast";
import {reservation} from "../../service/ApiService";

export const ReservationModalElement = (props: ModalType) => {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [allInclusive, setAllInclusive] = useState(false)


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
    const convertDateFormat = (date: string) => {
        const parts = date.split('-');

        const [year, month, day] = parts;
        return `${year}-${month}-${day}`
    };

    const reserveRoom=()=>{
        reservation({
            typeOfRoomId: props.roomTypeId,
            reservationRange: {
                startDate: convertDateFormat(startDate),
                endDate: convertDateFormat(endDate)
            }, allInclusive: allInclusive, userId: props.userId
        }).then(status=>{
            toast(status === 200 ? "Zareserwowano pokój" : 'Wystąpił problem podczas rezerwacji, sprawdź dostępność pokoju i spróbuj ponownie.', {
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
                        <div className={'d-flex border-bottom border-black my-3'}></div>
                        <Form.Group controlId="allInclusiveCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="All inclusive"
                                onChange={() => setAllInclusive(!allInclusive)}
                            />

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer className={'d-flex justify-content-between'}>
                    <h5>Wynajem na {reservationDaysCalculate() ? reservationDaysCalculate() : 0} dni
                        {reservationDaysCalculate() ? ' (' + props.pricePerDay * reservationDaysCalculate() + ' zł)' : null}</h5>
                    {reservationDaysCalculate() > 0 ? <CustomButton value={'Zarezerwuj'} onClick={() => reserveRoom() }></CustomButton> : null}
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
    userId: string
    roomTypeId: string
}