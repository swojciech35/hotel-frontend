import {Image} from "react-bootstrap";
import React from "react";
import {LuBedSingle} from "react-icons/lu";
import {MdOutlineBalcony, MdPerson} from "react-icons/md";
import {FaShower, FaXmark} from "react-icons/fa6";
import {FaCheck} from "react-icons/fa";

export const RoomTypeAdminPanelCard = (props: RoomTypeAdminPanelType) => {
    return (
        <>
            <div
                className={'d-flex  justify-content-space justify-content-between flex-row p-4 border border-black rounded m-2'}>
                <div className={'d-flex'} style={{width: '30%'}}>
                    <Image className="img-fluid rounded-4 border border-2 border-black"
                           src={props.photoUrl}
                           thumbnail
                           alt={props.name}/>
                </div>
                <div className={'d-flex flex-column '} style={{width: '70%'}}>
                    <h4 className={'d-flex align-items-center justify-content-center'}><strong>{props.name}</strong>
                    </h4>
                    <div className={'d-flex flex-row justify-content-between align-items-center'}>
                        <div className={'d-flex flex-column align-items-center mx-3'}>
                            <LuBedSingle size={30}/>
                            <strong>{props.numberOfBeds}</strong></div>
                        <div className={'d-flex flex-column align-items-center  mx-3'}>
                            <MdPerson size={30}/>
                            <strong>{props.numberOfPeople}</strong></div>

                        <div className={'d-flex flex-column align-items-center  mx-3'}>
                            <FaShower size={30}/>
                            {props.bathroom ? <FaCheck size={30}/> : <FaXmark size={30}/>}
                        </div>
                        <div className={'d-flex flex-column align-items-center  mx-3'}>
                            <MdOutlineBalcony size={30}/>
                            {props.balcony ? <FaCheck size={30}/> : <FaXmark size={30}/>}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
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