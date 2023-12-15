export const RoomCardAdminPanel = (props: RoomCardAdminPanelType) => {

    return (
        <div className={'d-flex flex-column justify-content-center border border-black rounded p-3 my-4'}>
            <h3 className={'d-flex justify-content-center p-3'}><strong>{props.typeName}</strong></h3>
            <div className={'d-flex flex-row justify-content-between'}>
                <p>Numer pokoju: {props.roomNumber} </p>
                <p>Piętro: {props.floor} </p>
                <p>Cena/dzień: {props.pricePerDay} zł </p>
            </div>
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