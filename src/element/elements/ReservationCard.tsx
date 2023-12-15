import {MdPerson} from "react-icons/md";
import {FaCalendarAlt, FaHome} from "react-icons/fa";
import React from "react";
export const ReservationCard = (props: ReservationCardType) => {

    return (
        <>
            <div className={'d-flex flex-row py-3 p-1 m-2 my-4 justify-content-between border border-black rounded'}>
                <div className={'d-flex flex-column align-items-center '}>
                    <MdPerson size={40} className={'mb-2'}/>
                    <p>{props.firstName + ' ' + props.lastName}</p>
                    <p>{props.email}</p>
                    <p>Liczba osób: {props.numberOfPeople}</p>
                </div>
                <div className={'d-flex border-start border-black border-1 px-1 '}></div>
                <div className={'d-flex flex-column align-items-center'}>
                    <FaHome size={40} className={'mb-2'}/>
                    <p>Pokój: {props.roomNumber}</p>
                    <p>Piętro: {props.roomFloor}</p>
                    <p style={{wordWrap: "break-word"}}>Typ: {props.typeOfRoomName}</p>
                </div>
                <div className={'d-flex border-start border-black border-1 px-1 '}></div>
                <div className={'d-flex flex-column align-items-center'}>
                    <FaCalendarAlt size={40} className={'mb-2'}/>
                    <p>Początek: {props.startDate}</p>
                    <p>Koniec: {props.endDate}</p>
                    <p>All inclusive: {props.allInclusive ? 'Tak' : 'Nie'}</p>
                    <p>{props.price}zł</p>
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
