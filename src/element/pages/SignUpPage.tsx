import React, {useState} from "react";
import {LinkToButton} from "../elements/LinkToButton";
import {CustomButton} from "../elements/CustomButton";

export const SignUpPage = () => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordRepeat: ''

    })

    const handleChange = (field: string | number, value: string | number) => {
        setFormData({...formData, [field]: value});
    };
    const submit = () => {
        console.log(formData)
    }

    return (<>
        <div className={'d-flex align-items-center flex-column pt-5  p-3'}
             style={{backgroundColor: '#FCCE9C', minHeight: '95vh'}}>
            <h1>Zarejestruj się </h1>
            <div className={''} style={{width: '30%'}}>
                <form className={'p-3'} onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><strong>Imię:</strong></label>
                        <input type="text" className="form-control" value={formData.name} id="name"
                               onChange={(e) => handleChange('name', e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label"><strong>Nazwisko:</strong></label>
                        <input type="text" className="form-control" value={formData.surname} id="surname"
                               onChange={(e) => handleChange('surname', e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                        <input type="email" className="form-control" value={formData.email} id="email"
                               onChange={(e) => handleChange('email', e.target.value)} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Hasło:</strong></label>
                        <input type="password" className="form-control" id="password" value={formData.password}
                               onChange={(e) => handleChange('password', e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordRepeat" className="form-label"><strong>Powtórz Hasło:</strong></label>
                        <input type="password" className="form-control" id="passwordRepeat"
                               value={formData.passwordRepeat}
                               onChange={(e) => handleChange('passwordRepeat', e.target.value)}/>
                    </div>
                    <div className={"d-flex flex-row justify-content-evenly"}>
                        <LinkToButton value={"Zaloguj się "} linkTo={'/signin'}/>
                        <CustomButton value={'Zarejestruj się '} type={"submit"}/>

                    </div>

                </form>
            </div>
        </div>
    </>)
}

interface FormData {
    email: string
    password: string
    passwordRepeat: string
    name: string
    surname: string
}