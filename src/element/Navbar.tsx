import {LinkToButton} from "./elements/LinkToButton";
import {Link} from "react-router-dom";
import {CustomButton} from "./elements/CustomButton";

export const Navbar = () => {
    return (
        <>
            <div className={"d-flex flex-row justify-content-between align-items-center p-1"}
                 style={{backgroundColor: '#FFB28E'}}>
                <Link to={'/'} style={{color: "black", textDecoration: "none"}}>
                    <h1>Hotel</h1>
                </Link>
                {localStorage.getItem('token') ?
                    <CustomButton value={'Wyloguj się'} onClick={() => {
                        localStorage.removeItem('token')
                        window.location.reload()
                    }}></CustomButton>
                    :
                    <div className={'d-flex p-2'}>
                        <LinkToButton value={'Zarejestruj się'} linkTo={"/signup"}/>
                        <LinkToButton value={'Zaloguj się'} linkTo={'/signin'}/>
                    </div>
                }


            </div>
        </>
    )

}