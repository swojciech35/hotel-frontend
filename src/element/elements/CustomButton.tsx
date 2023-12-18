export const CustomButton = (props: CustomButtonTypes) => {
    return (
        <button type={props.type ? props.type : 'button'} className="btn mx-3"
                style={{backgroundColor: '#4D1C61', color: "white"}}
                onClick={props.onClick}>{props.value} </button>
    )
}

interface CustomButtonTypes {
    value: string,
    onClick?: () => void,
    type?: "button" | "submit"
}