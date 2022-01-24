import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';

import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {
    
    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm({
        name:"fernachooo",
        email: "fer@jeje.com",
        password: "123456",
        confirmPassword: "123456"
    });
    
    const { name, email, password, confirmPassword } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if ( isFormValid() ) {
            console.log("Form is valid");
            dispatch( formValues( name, email, password ) )
            
        } else {
            console.log("Form is invalid");
        } 
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            console.log("Name is required");
            return false;
        }
        if(!validator.isEmail(email)){
            console.log("Email is invalid");
            return false;
        }
        if(password !== confirmPassword || password.length < 5){
            console.log("Passwords do not match and should be at least 6 characters");
            return false;
        }
        return true;

    }


    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                <div className='auth__alert-error'>
                    Error!
                </div>

                <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        className="auth__input"
                        autoComplete='off'
                        value={ name }
                        onChange={ handleInputChange }
                    />

                <input 
                    type="text" 
                    placeholder="Email" 
                    name="email" 
                    className="auth__input"
                    autoComplete='off'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder="Repeat Password" 
                    name="confirmPassword"
                    className="auth__input"
                    value={ confirmPassword }
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link mt-5"
                >
                    Already Registered?
                </Link>

            </form>
        </>
    )
}
