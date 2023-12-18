import {LinkToButton} from "../elements/LinkToButton";
import {CustomButton} from "../elements/CustomButton";
import React, {useState} from "react";
import {signIn} from "../../service/ApiService";
import toast, {Toaster} from "react-hot-toast";

export const SignInPage = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })

    const handleChange = (field: string | number, value: string | number) => {
        setFormData({...formData, [field]: value});
    };
    const submit =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       signIn(formData).then((status)=>{
           if(status===200){
               toast("Zalogowano pomyślnie", {
                   style: {
                       borderRadius: '10px',
                       background: '#4D1C61',
                       color: '#fff',
                   },
               })
               setTimeout(() => {
                   window.location.href = "/"
               }, 1300)
           }else {
               toast("Błąd logowania \n sprawdź dane i spróbuj ponownie ", {
                   style: {
                       borderRadius: '10px',
                       background: '#4D1C61',
                       color: '#fff',
                       textAlign: "center"
                   },
               })
           }
       })
    }
    return (<>
        <div className={'d-flex align-items-center flex-column pt-5  p-3'}
             style={{backgroundColor: '#FCCE9C', minHeight: '95vh'}}>
            <h1>Zaloguj się </h1>
            <div className={''} style={{width: '30%'}}>
                <form className={'p-3'} onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                        <input type="email" className="form-control" value={formData.email} id="email"
                               onChange={(e) => handleChange('email', e.target.value)} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Hasło:</strong></label>
                        <input type="password" className="form-control" id="password"
                               onChange={(e) => handleChange('password', e.target.value)}/>
                    </div>
                    <div className={"d-flex flex-row justify-content-evenly"}>
                        <LinkToButton value={"Zarejestruj się"} linkTo={'/signup'}/>
                        <CustomButton value={'Zaloguj się'} type={"submit"}/>
                    </div>
                </form>
            </div>
        </div>
        <Toaster/>
    </>)

}

interface FormData {
    email: string
    password: string
}