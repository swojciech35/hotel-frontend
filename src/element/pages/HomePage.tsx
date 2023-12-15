import {HotelRoomCard} from "../elements/HotelRoomCard";
import {useEffect, useState} from "react";
import {getRooms} from "../../service/ApiService";
import Modal from 'react-bootstrap/Modal';
export const HomePage = () => {
    const[rooms, setRooms]=useState<RoomType[]|null>(null)
    useEffect(() => {
       getRooms().then((rooms:RoomType[])=>setRooms(rooms ? rooms:null) )
    }, []);
    return (
        <div className={'d-flex  justify-content-center'} style={{backgroundColor: '#FCCE9C', minHeight: '95vh'}}>

            <div  style={{ maxWidth:'55%'}}>
                {
                   rooms? rooms.map((room,index) => (
                        <HotelRoomCard key={index} id={room.id} name={room.name} numberOfPeople={room.numberOfPeople} numberOfBeds={room.numberOfBeds} bathroom={room.bathroom} balcony={room.balcony} pricePerDay={room.pricePerDay} photoUrl={room.photoUrl}/>
                    )):null
                }
            </div>
        </div>
    )

}
interface RoomType{
    id: string
    name: string
    numberOfPeople: number
    numberOfBeds: number
    bathroom: boolean
    balcony: boolean
    pricePerDay: number
    photoUrl: string
}