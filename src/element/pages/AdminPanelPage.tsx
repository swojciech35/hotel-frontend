import React, {useEffect, useState} from "react";
import {ReservationCard} from "../elements/ReservationCard";
import {getAllReservations} from "../../service/ApiService";

export const AdminPanelPage = () => {
    const [reservations, setReservations] = useState<ReservationCardType[] | null>(null)

    useEffect(() => {
        getAllReservations().then((reservations: ReservationCardType[]) => {
            setReservations(reservations ? reservations : null)
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
                </div>
                <div className={'d-flex flex-column border border-4 border-black rounded-4 m-2 p-3 '}
                     style={{width: '30%'}}>
                    <h3>Rodzaje pokoi</h3>
                    <div className={'d-flex border-bottom border-black border-4 my-3'}></div>
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