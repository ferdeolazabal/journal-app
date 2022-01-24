import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebaseConfig';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../redux/actions/auth';

export const AppRouter = () => {
    
    const dispatch = useDispatch()

    const [ checking, setChecking ]   = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect( () => {
    
        firebase.auth().onAuthStateChanged( (user) => {
        
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn( true )
            } else {
                setIsLoggedIn( false )
            }

            setChecking(false)
        })
    
    }, [ dispatch, setChecking, setIsLoggedIn ] )
    
    
    if ( checking ) {
        return (
            
            <div className="nothing__main-content">
                <i className="fas fa-spinner fa-spin fa-4x"></i>
            </div>
            
        )
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth" 
                        component={ AuthRouter } 
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute
                        exact path="/" 
                        component={ JournalScreen } 
                        isAuthenticated={ isLoggedIn }
                    />
                
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
