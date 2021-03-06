import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startLoginGoogle } from '../../redux/actions/auth';
import { removeError, setError } from '../../redux/actions/ui';

export const LoginScreen = () => {
    
    const dispatch = useDispatch()
    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''

    });
    
    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if ( isFormValid() ){
            dispatch( startLoginEmailPassword( email, password ) )
        }
    }

    const handleGoogleLogin = () => {
        dispatch( startLoginGoogle() );
    }

    const isFormValid = () => {
        if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is invalid') )
            return false;
        }
        else if( password.length < 6 ){
            dispatch( setError('Password should be at least 6 characters') )
            return false;
        }
        else {
            dispatch( removeError() )
            return true;
        }
    }



    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={ handleLogin }
            >

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

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mt-5"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p
                        className=""
                    >Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
