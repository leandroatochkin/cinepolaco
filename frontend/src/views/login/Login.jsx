import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uiStore } from '../../utils/stores/uiStore'
import { userStore } from '../../utils/stores/userStore'
import { login } from '../../utils/helpers/async'
import { MoonLoader } from 'react-spinners';
import ToggleableInput from '../../utils/components/inputs/ToggleableInput'
import style from './Login.module.css'



const Login = () => {
const loading = uiStore((state)=>state.loading)
const setLoading = uiStore((state)=>state.setLoading)
const setLoggedIn = userStore((state)=>state.setLoggedIn)

 const navigate = useNavigate()





    const formData = useRef({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formData.current[name] = value; // Update the ref's value
    };

    const handleLogin = async () => {
        setLoading(true)
        try{
            const data = await login(formData.current.username, formData.current.password)
            if(data.valid){
                setLoading(false)
                setLoggedIn(true)
                navigate('/admin')
            } else {
                alert('Invalid username or password')
            }
        }
        catch(e){
            console.log(e)
        }
    }



  return (

        <div className={style.container} aria-label="Login container">
          <div className={style.login} aria-label="Login form">
            <div className={style.title} aria-label="Welcome Back!">
            </div>
    
            {/* Show loader while the login process is happening */}
            {loading ? (
                <MoonLoader />
            ):(
                              <div className={style.formContainer} aria-label="Google login button container">
                
                              {/*-----------------------inputs container---------------------------*/}
                              <h4 className={style.legend} aria-label="Login form legend">login</h4>
                                <div  className={style.inputContainer}>
                                  {/*-----------------------email input---------------------------*/}
                                  <input type='text' name='username' placeholder='username' className={style.input} onChange={handleChange}/>
                  
                  
                              
                                      <ToggleableInput handleChange={handleChange} placeholder={'password'} name={'password'}/>
                                
                                  {/* <p className={invalidCredentials ? style.invalidCredentials : style.hidden}>{language.error_messages.invalid_credentials}</p> */}
                                </div>
                                <div className={style.loginBtnContainer}>
                  {/*-----------------------login button---------------------------*/}
                  
                                      <button  className={style.button} onClick={handleLogin}>login</button>
                               
                  {/*-----------------------login button---------------------------*/}
                                </div>
                  
                  
                                {/*-----------------------inputs container---------------------------*/}
              
                            </div>
            )}

            
          </div>
    
        </div>
      
  )
}

export default Login