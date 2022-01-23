import React from 'react'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {
    
    const [ formValues, handleInputChange ] = useForm({
        name:"fernachooo",
        email: "fer@jeje.com",
        password: "123",
        confirmPassword: "123"
    });
    
    const { name, email, password, confirmPassword } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name, email, password, confirmPassword);
    }
    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

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
