import React, {useEffect, useState} from "react";
import {deleteReservationByRoomId, deleteRoom} from "../../service/ApiService";
import {Toaster} from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import {toastNotify} from "./Toast";


export const ModalConfirmDelete = (props: { show: boolean, roomId: string, onClose: () => void }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleClose = () => {
        setShow(false)
        props.onClose()
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Czy na pewno usunąć pokój?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Wraz z pokojem zostaną usunięte wszystkie jego rezerwacje. Czy na pewno chcesz go usunąć?</p>
                    <div className={'d-flex flex-row justify-content-evenly'}>
                        <button type="button" className="btn btn-secondary border border-2 border-black "
                                onClick={handleClose}>wróć
                        </button>

                        <button type="button" className="btn btn-danger border border-2 border-black "
                                onClick={() => {
                                    deleteReservationByRoomId(props.roomId)
                                    deleteRoom(props.roomId).then(status => {
                                        if (status === 200) {
                                            toastNotify("Usinięto")
                                            setTimeout(() => {
                                                handleClose()
                                                window.location.reload()
                                            }, 1300)

                                        } else {
                                            toastNotify("Błąd podczasu usuwania")
                                        }

                                    })
                                }}
                        >usuń
                        </button>
                    </div>

                </Modal.Body>
            </Modal>
            <Toaster/>

        </>
    )
}