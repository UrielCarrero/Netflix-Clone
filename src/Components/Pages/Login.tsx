import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../../Styles/Login.css';
import Netflixlogo from '../../Assets/Netflix_logo.png'
import { Link } from 'react-router-dom';

interface ILogin {
    state:any
    emailValidation: (email:string) => void;
    passwordValidation: ({email,password}:any) => void;

}

export const Login = ({passwordValidation, emailValidation, state}:ILogin):JSX.Element => {

    let [showPassword, setShowPassword] = useState(false)
    let [showTerms, setShowTerms] = useState(false)
    let [emailActive, setEmailActive] = useState(false)
    let [passwordActive, setPasswordActive] = useState(false)
    const navigate = useNavigate();

    let [inputFields, setInputFields] = useState<{email:string, password:string}>({email:state.user.email, password:""})

    const handleChange = (event:any) => {
        let target= event.target
        let value = target.value
        let name = target.name
        //let newField:any = {address:{...validatedUser.address},name:{...validatedUser.name}}
        //let newError:any= {}

        if(name==="email_phone"){

            setInputFields({email: value, password: inputFields.password?inputFields.password:""})
        }
        else if(name==="password"){
            setInputFields({email: inputFields.email, password: value})
        }
        console.log(inputFields)
        event.preventDefault()
    } 


    const handleOnSubmit = (event:any) =>{
        emailValidation(inputFields.email)
        passwordValidation({...inputFields})
        event.preventDefault()
        //
    }

    useEffect(()=>{
        if(state.active){
            navigate('/browse')
        }
        if(inputFields.email!==""){
            setEmailActive(true)
        }

    }
    ,[state])

    //https://assets.nflxext.com/ffe/siteui/vlv3/5aecc44d-2a1f-4313-8399-98df20908b64/8bf33a8a-7578-4438-a4f1-a49d80721d8d/CO-en-20221114-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w,  1500w
    return(<>
        <div className='mainlog__container'>
            <img className='loginlogo__nav' alt="netflix_logo" src={Netflixlogo} />
            <div className='mainimg__cover'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/5aecc44d-2a1f-4313-8399-98df20908b64/8bf33a8a-7578-4438-a4f1-a49d80721d8d/CO-en-20221114-popsignuptwoweeks-perspective_alpha_website_medium.jpg"></img>
            </div>
            <div className='loginform__cont'>
                <h2>Sign In</h2>
                <form>
                    <div>
                        {
                            state.errMess!==""?
                            <div className='Login__errMess'>
                                {state.errMess}

                            </div>:<></>
                        }
                    </div>
                    <div className={` ${emailActive?'contlabel_active':''} emailphone__container`} onClick={()=> setEmailActive(true)}>
                        <label htmlFor='email_phone' className={`${emailActive?'emaillabel_active':''}`}>Email</label>
                        <input name='email_phone' id='email_phone' type='text'
                        onBlur={()=>inputFields.email===""?setEmailActive(false):setEmailActive(true)} 
                        onChange={(event)=>{handleChange(event)}}
                        value={inputFields.email} required/>
                    </div>
                    <div className={`${passwordActive?'contlabel_active':''} passwordlogin__container`} onClick={()=> setPasswordActive(true)}>
                        <label htmlFor='password' className={`${passwordActive?'emaillabel_active':''}`}>Password</label>
                        <input name='password' id='password' 
                        onBlur={()=>inputFields.password===""?setPasswordActive(false):setPasswordActive(true)} 
                        type={`${showPassword?"text":"password"}`} 
                        onChange={(event)=>{handleChange(event)}}
                        value={inputFields.password}
                        required/>
                        <button onClick={(event)=>{setShowPassword(!showPassword)
                                                    event.preventDefault()
                                                } 
                                                
                    } style={{display:passwordActive?"block":"none"}}>{showPassword?"HIDE":"SHOW"}</button>
                    </div>
                    
                    <button type='submit' className='logsign__in' onClick={(event) => {
                                                            handleOnSubmit(event)
                                                            }} >Sign In</button>
                </form>
                <div className='beneath__signin'>
                    <span>
                        <input type="checkbox" />
                        Remember me
                    </span>
                    <span>
                        Need help?
                    </span>
                </div>
                <div className='new__netflixuser'>
                    <span>New to Netflix?</span>
                    <span> <Link to='/signup'>Sign up now</Link></span>
                </div>
                <div className='captcha'>
                    <span>This page is protected by Google reCAPTCHA to ensure you're not a bot.</span>
                    <span onClick={(event:any)=>{setShowTerms(true)
                                                event.preventDefault()}
                    }>Learn more.</span>
                    {
                    showTerms?
                    <p>
                        
                        The information collected by Google reCAPTCHA is subject to the Google 
                        <a href="https://policies.google.com/privacy">Privacy Policy </a>
                        and 
                        <a href="https://policies.google.com/terms"> Terms of Service</a>
                        , and is used for providing, maintaining, and improving the reCAPTCHA 
                        service and for general security purposes (it is not used for personalized advertising 
                        by Google).
                    </p>:
                    <></>
                    }
                    
                </div>
            </div>
        </div>
    </>)
}