import React, {useState} from "react";
import {Image} from "react-bootstrap";
import {LuBedSingle} from "react-icons/lu";
import {MdPerson} from "react-icons/md";
import {FaShower} from "react-icons/fa6";
import {FaCheck} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {MdOutlineBalcony} from "react-icons/md";
import {CustomButton} from "./CustomButton";
import {ReservationModalElement} from "./ReservationModalElement";

export const HotelRoomCard = (props: HotelRoomCardType) => {

    const [showModal,setShowModal]=useState(false)
    return (<>
        <div className={'d-flex flex-row rounded-4 border border-black border-4 m-4'}>
            <div className={"d-flex flex-column p-3"} style={{width: '50%'}}>
                <Image className="img-fluid rounded-4 border border-2 border-black"
                       src={props.photoUrl}
                       thumbnail
                       alt={props.name}/>
            </div>
            <div className={"d-flex flex-column align-items-center justify-content-evenly pt-3"} style={{width: '50%'}}>
                <h3><strong>{props.name}</strong></h3>
                <div className={'d-flex flex-row justify-content-evenly mx-5 my-2'} style={{width: '100%'}}>
                    <div className={'d-flex align-items-center'}>
                        <LuBedSingle size={30} className={'me-2'}/>
                        <strong>{props.numberOfBeds}</strong></div>
                    <div className={'d-flex align-items-center'}>
                        <MdPerson size={30} className={'me-2'}/>
                        <strong>{props.numberOfPeople}</strong></div>
                </div>
                <div className={'d-flex flex-row justify-content-evenly mx-5 my-2'} style={{width: '100%'}}>
                    <div className={'d-flex align-items-center'}>
                        <FaShower size={30}/> {props.bathroom ? <FaCheck size={30}/> : <FaXmark size={30}/>}
                    </div>
                    <div className={'d-flex align-items-center'}>
                        <MdOutlineBalcony size={30}/> {props.balcony ? <FaCheck size={30}/> : <FaXmark size={30}/>}
                    </div>

                </div>
                <div className={'d-flex flex-row align-items-center justify-content-between mx-5 mt-5'}
                     style={{width: '100%'}}>
                    <h4>Cena: {props.pricePerDay} zł/dzień</h4>
                    <div className={'pb-2'}>
                        <CustomButton value={"Zarezerwuj"} onClick={()=> {
                            setShowModal(true)
                        }}/>
                    </div>
                    <ReservationModalElement show={showModal} onClose={()=>setShowModal(false)} name={props.name} numberOfBeds={props.numberOfBeds} numberOfPeople={props.numberOfPeople} pricePerDay={props.pricePerDay}/>
                </div>
            </div>

        </div>
    </>)
}

interface HotelRoomCardType {
    id: string
    name: string
    numberOfPeople: number
    numberOfBeds: number
    bathroom: boolean
    balcony: boolean
    pricePerDay: number
    photoUrl: string

}