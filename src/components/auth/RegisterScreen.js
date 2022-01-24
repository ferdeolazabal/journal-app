import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import Swal from 'sweetalert2'

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/auth';
import { setError, removeError } from '../../redux/actions/ui';


export const RegisterScreen = () => {
    
    const dispatch = useDispatch()
    // const { msgError } = useSelector( state => state.ui );

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
            dispatch( startRegisterWithEmailPasswordName( name, email, password) );
        }
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Name is required'
            });
            return false;
        }
        else if( !validator.isEmail( email ) ){
            dispatch( setError('Email is invalid') )
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Email is invalid'
            });
            return false;
        }
        else if( password.length < 6 ){
            dispatch( setError('Password should be at least 6 characters') )
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Password should be at least 6 characters'
            });
            return false;
        }
        else if( password !== confirmPassword ){
            dispatch( setError('Passwords do not match') )
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Passwords do not match'
            });
            return false;
        }

            dispatch( removeError() )
        
        return true;

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
