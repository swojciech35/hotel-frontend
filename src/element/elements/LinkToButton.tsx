import {Link} from "react-router-dom";
import {CustomButton} from "./CustomButton";

export const LinkToButton = (props: LinkToInterface) => {
    return (
        <Link to={props.linkTo}>
            <CustomButton value={props.value}/>
        </Link>
    )
}

interface LinkToInterface {
    value: string,
    linkTo: string
}