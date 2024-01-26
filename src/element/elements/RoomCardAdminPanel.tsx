import { FaMinus } from "react-icons/fa6";
import {deleteRoom} from "../../service/ApiService";
import {ModalConfirmDelete} from "./ModalConfirmDelete";
import {useState} from "react";
export const RoomCardAdminPanel = (props: RoomCardAdminPanelType) => {
const [showDelete,setShowDelete]=useState(false)
    const onCloseShowDelete=()=>{
    setShowDelete(false)
    }
    return (
        <div className={'d-flex flex-column justify-content-center border border-black rounded p-3 my-4'}>
            <div className={'d-flex flex-row-reverse justify-content-between align-items-center'}>
            <FaMinus className={''} size={30} color={'red'} onClick={()=>setShowDelete(true)}></FaMinus>
            <h4 className={'d-flex justify-content-center p-3'}><strong>{props.typeName}</strong></h4>
                <a></a>
            </div>
            <div className={'d-flex flex-row justify-content-between'}>
                <p>Numer pokoju: {props.roomNumber} </p>
                <p>Piętro: {props.floor} </p>
                <p>Cena/dzień: {props.pricePerDay} zł </p>
            </div>
            <ModalConfirmDelete show={showDelete} roomId={props.roomId} onClose={()=>setShowDelete(false)}/>
        </div>

    )
}

interface RoomCardAdminPanelType {
    roomId: string
    roomNumber: number
    typeId: string
    floor: number
    typeName: string
    pricePerDay: number
}