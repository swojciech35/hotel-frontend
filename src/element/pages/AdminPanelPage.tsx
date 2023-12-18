import React, {useEffect, useState} from "react";
import {ReservationCard} from "../elements/ReservationCard";
import {getAllReservations, getAllRooms, getTypesRooms} from "../../service/ApiService";
import {RoomCardAdminPanel} from "../elements/RoomCardAdminPanel";
import {RoomTypeAdminPanelCard} from "../elements/RoomTypeAdminPanelCard";
import {IoMdAdd} from "react-icons/io";
import {ModalAddNewRoom} from "../elements/ModalAddNewRoom";
import {ModalAddNewRoomType} from "../elements/ModalAddNewRoomType";
import {FaSearch} from "react-icons/fa";

export const AdminPanelPage = () => {
    const [reservations, setReservations] = useState<ReservationCardType[] | null>(null)
    const [filteredReservations, setFilteredReservations] = useState<ReservationCardType[] | null>(null)
    const [rooms, setRooms] = useState<RoomCardAdminPanelType[] | null>(null)
    const [roomsType, setRoomsType] = useState<RoomTypeAdminPanelType[] | null>(null)
    const [showModalAddRoom, setShowModalAddRoom] = useState(false)
    const [showModalAddRoomType, setShowModalAddRoomType] = useState(false)
    useEffect(() => {
        getAllReservations().then((reservations: ReservationCardType[]) => {
            setReservations(reservations ? reservations : null)
            setFilteredReservations(reservations ? reservations : null)
        })
        getAllRooms().then((rooms: RoomCardAdminPanelType[]) => {
            setRooms(rooms ? rooms : null)
        })

        getTypesRooms().then((rooms: RoomTypeAdminPanelType[]) => {
            setRoomsType(rooms ? rooms : null)
        })
    }, []);

    const filter = (value: string) => {
        if (reservations && value.length > 0) {
            const filtered = reservations.filter(reservation => reservation.email.includes(value))
            setFilteredReservations(filtered)
        } else {
            setFilteredReservations(reservations);
        }
    }
    return (
        <>
            <div className={'d-flex  justify-content-space justify-content-between flex-row p-4'}
                 style={{backgroundColor: '#FCCE9C', minHeight: '90vh'}}>
                <div className={'d-flex flex-column border border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '33%'}}>
                    <div className={'d-flex flex-row justify-content-between align-items-center'}>
                        <h3>Rezerwacje</h3>
                        <div className={'d-flex align-items-center '}>
                            <FaSearch size={25}/>
                            <input type="text" className="form-control ms-3" id="search" placeholder="wpisz email"
                                   onChange={(e) => filter(e.target.value)}/>
                        </div>
                    </div>
                    <div className={'d-flex border-bottom border-black border-4 my-3'}></div>
                    <div style={{overflowY: "auto", maxHeight: '75vh'}}>
                        {filteredReservations ? filteredReservations.map((reservations, index) => (
                            <ReservationCard reservationId={reservations.reservationId}
                                             startDate={reservations.startDate} endDate={reservations.endDate}
                                             allInclusive={reservations.allInclusive} price={reservations.price}
                                             firstName={reservations.firstName} lastName={reservations.lastName}
                                             email={reservations.email} roomNumber={reservations.roomNumber}
                                             roomFloor={reservations.roomFloor}
                                             typeOfRoomName={reservations.typeOfRoomName}
                                             numberOfPeople={reservations.numberOfPeople} key={index}/>
                        )) : <p>Brak rezerwacji</p>}
                    </div>
                </div>
                <div className={'d-flex flex-column border  border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '30%'}}>
                    <div className={'d-flex flex-row justify-content-between align-items-center'}>
                        <h3>Pokoje</h3> <IoMdAdd size={40} onClick={() => setShowModalAddRoom(true)}/>
                    </div>
                    <div className={'d-flex flex-column border-bottom border-black border-4 my-3'}></div>
                    <div style={{overflowY: "auto", maxHeight: '75vh'}}>
                        {rooms ? rooms.map((room, index) => (
                            <RoomCardAdminPanel roomId={room.roomId} roomNumber={room.roomNumber} typeId={room.typeId}
                                                floor={room.floor} typeName={room.typeName}
                                                pricePerDay={room.pricePerDay} key={index}/>
                        )) : <p>Brak pokoi</p>}
                    </div>
                </div>
                <div className={'d-flex flex-column border border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '30%'}}>

                    <div className={'d-flex flex-row justify-content-between align-items-center'}>
                        <h3>Rodzaje pokoi</h3>
                        <IoMdAdd size={40} onClick={() => setShowModalAddRoomType(true)}/>
                    </div>
                    <div className={'d-flex border-bottom border-black border-4 my-3'}></div>
                    <div style={{overflowY: "auto", maxHeight: '75vh'}}>
                        {
                            roomsType ? roomsType.map((room, index) => (
                                    <RoomTypeAdminPanelCard id={room.id} name={room.name}
                                                            numberOfPeople={room.numberOfPeople}
                                                            numberOfBeds={room.numberOfBeds} bathroom={room.bathroom}
                                                            balcony={room.balcony} pricePerDay={room.pricePerDay}
                                                            photoUrl={room.photoUrl} key={index}/>

                                )) :
                                <p>Brak typów pokoi</p>
                        }
                    </div>
                </div>
                <ModalAddNewRoom show={showModalAddRoom} onClose={() => {
                    setShowModalAddRoom(false)
                }}
                                 roomsType={roomsType}/>
                <ModalAddNewRoomType show={showModalAddRoomType} onClose={() => {
                    setShowModalAddRoomType(false)
                }}></ModalAddNewRoomType>
            </div>
        </>
    )
}

interface ReservationCardType {
    reservationId: string,
    startDate: string,
    endDate: string,
    allInclusive: boolean,
    price: number,
    firstName: string,
    lastName: string,
    email: string,
    roomNumber: number,
    roomFloor: number,
    typeOfRoomName: string,
    numberOfPeople: number
}

interface RoomCardAdminPanelType {
    roomId: string
    roomNumber: number
    typeId: string
    floor: number
    typeName: string
    pricePerDay: number
}

interface RoomTypeAdminPanelType {
    id: string
    name: string
    numberOfPeople: number
    numberOfBeds: number
    bathroom: boolean
    balcony: boolean
    pricePerDay: number
    photoUrl: string
}
