import React, {useEffect, useState} from "react";
import {ReservationCard} from "../elements/ReservationCard";
import {getAllReservations, getAllRooms, getTypesRooms} from "../../service/ApiService";
import {RoomCardAdminPanel} from "../elements/RoomCardAdminPanel";
import {RoomTypeAdminPanelCard} from "../elements/RoomTypeAdminPanelCard";

export const AdminPanelPage = () => {
    const [reservations, setReservations] = useState<ReservationCardType[] | null>(null)
    const [rooms, setRooms] = useState<RoomCardAdminPanelType[] | null>(null)
    const [roomsType, setRoomsType] = useState<RoomTypeAdminPanelType[] | null>(null)

    useEffect(() => {
        getAllReservations().then((reservations: ReservationCardType[]) => {
            setReservations(reservations ? reservations : null)
        })
        getAllRooms().then((rooms: RoomCardAdminPanelType[]) => {
            setRooms(rooms ? rooms : null)
        })

        getTypesRooms().then((rooms: RoomTypeAdminPanelType[]) => {
            setRoomsType(rooms ? rooms : null)
        })
    }, []);

    return (
        <>
            <div className={'d-flex  justify-content-space justify-content-between flex-row p-4'}
                 style={{backgroundColor: '#FCCE9C', minHeight: '95vh'}}>
                <div className={'d-flex flex-column border border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '33%'}}>
                    <h3>Rezerwacje</h3>
                    <div className={'d-flex border-bottom border-black border-4 my-3'}></div>
                    <div style={{overflowY: "auto", maxHeight: '75vh'}}>
                        {reservations ? reservations.map((reservations, index) => (
                            <ReservationCard reservationId={reservations.reservationId}
                                             startDate={reservations.startDate} endDate={reservations.endDate}
                                             allInclusive={reservations.allInclusive} price={reservations.price}
                                             firstName={reservations.firstName} lastName={reservations.lastName}
                                             email={reservations.email} roomNumber={reservations.roomNumber}
                                             roomFloor={reservations.roomFloor}
                                             typeOfRoomName={reservations.typeOfRoomName}
                                             numberOfPeople={reservations.numberOfPeople}/>
                        )) : <p>Brak rezerwacji</p>}
                    </div>
                </div>
                <div className={'d-flex flex-column border  border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '30%'}}>
                    <h3>Pokoje</h3>
                    <div className={'d-flex flex-column border-bottom border-black border-4 my-3'}></div>
                    <div style={{overflowY: "auto", maxHeight: '75vh'}}>
                        {rooms ? rooms.map((room, index) => (
                            <RoomCardAdminPanel roomId={room.roomId} roomNumber={room.roomNumber} typeId={room.typeId}
                                                floor={room.floor} typeName={room.typeName}
                                                pricePerDay={room.pricePerDay}/>
                        )) : <p>Brak pokoi</p>}


                    </div>
                </div>
                <div className={'d-flex flex-column border border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '30%'}}>
                    <h3>Rodzaje pokoi</h3>
                    <div className={'d-flex border-bottom border-black border-4 my-3'}></div>
                    {
                        roomsType ? roomsType.map((room, index) => (
                                <RoomTypeAdminPanelCard id={room.id} name={room.name} numberOfPeople={room.numberOfPeople}
                                                        numberOfBeds={room.numberOfBeds} bathroom={room.bathroom}
                                                        balcony={room.balcony} pricePerDay={room.pricePerDay}
                                                        photoUrl={room.photoUrl}/>

                            )) :
                            <p>Brak typów pokoi</p>
                    }

                </div>

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