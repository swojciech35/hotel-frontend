import {HotelRoomCard} from "../elements/HotelRoomCard";
import React, {useEffect, useState} from "react";
import {availableRooms, getTypesRooms} from "../../service/ApiService";
import {Col, Form, Row} from "react-bootstrap";
import toast from "react-hot-toast";

export const HomePage = () => {
    const [rooms, setRooms] = useState<RoomType[] | null>(null)
    const [filteredRooms, setFilteredRooms] = useState<RoomType[] | null>(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    useEffect(() => {
        getTypesRooms().then((rooms: RoomType[]) => {
            setRooms(rooms ? rooms : null)
            setFilteredRooms(rooms ? rooms : null)
        })
    }, []);


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

    const filter = async () => {
        if (startDate === '' && endDate === '') {
            setFilteredRooms(rooms)
        } else if (rooms) {
            const idRoomsToShow: string[] = await availableRooms({
                startDate: convertDateFormat(startDate),
                endDate: convertDateFormat(endDate)
            })
            const filtered = rooms.filter(room => idRoomsToShow.includes(room.id));
            setFilteredRooms(filtered);
        }

    }
    const convertDateFormat = (date: string) => {
        const parts = date.split('-');

        const [year, month, day] = parts;
        return `${year}-${month}-${day}`
    };
    return (
        <div className={'d-flex  justify-content-center'} style={{backgroundColor: '#FCCE9C', minHeight: '95vh'}}>
            <div style={{maxWidth: '55%'}}>

                <Form className={' justify-content-center items-align-center mx-5 my-3 '}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="dayFrom">
                                <Form.Label><strong>Od:</strong></Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Od:"
                                    autoFocus
                                    onChange={e => {
                                        setStartDate(e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="dayTo">
                                <Form.Label><strong>Do:</strong></Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Do:"
                                    onChange={e => {
                                        handleSetEndDate(e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="searchButton" className={'d-flex pt-4 m-2'}>
                                <Form.Control
                                    style={{
                                        background: '#4D1C61',
                                        color: '#fff'
                                    }}
                                    type="button"
                                    value={(filteredRooms !== rooms) ? 'wyczyść' : 'szukaj'}
                                    onClick={() => {
                                        (filteredRooms !== rooms) ? setFilteredRooms(rooms) : filter()
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                {
                    filteredRooms ? filteredRooms.map((room, index) => (
                        <HotelRoomCard key={index} id={room.id} name={room.name} numberOfPeople={room.numberOfPeople}
                                       numberOfBeds={room.numberOfBeds} bathroom={room.bathroom} balcony={room.balcony}
                                       pricePerDay={room.pricePerDay} photoUrl={room.photoUrl}/>
                    )) : null
                }
            </div>
        </div>
    )

}

interface RoomType {
    id: string
    name: string
    numberOfPeople: number
    numberOfBeds: number
    bathroom: boolean
    balcony: boolean
    pricePerDay: number
    photoUrl: string
}